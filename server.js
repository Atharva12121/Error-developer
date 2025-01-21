require('regenerator-runtime/runtime'); // Ensure regenerator-runtime is available

const express = require('express');
const multer = require('multer'); // Middleware to handle file uploads.
const pdfParse = require('pdf-parse'); // Library to extract text from a PDF file.
const { PDFDocument, rgb } = require('pdf-lib'); // Library to create a new PDF document and embed custom fonts.
const fs = require('fs-extra'); //  Provides methods for working with the file system, such as reading and writing files.
const path = require('path'); //Utility for handling file paths.
const axios = require('axios'); // Used to make HTTP requests, specifically for translating text via the Google Translate API.
const fontkit = require('@pdf-lib/fontkit'); //  A library for working with custom fonts in pdf-lib.

// Setup Express app
const app = express();
const port = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend')); // Set views directory to 'frontend'

// Serve static files (for PDF sample and icons)
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve static files from 'uploads' directory (for uploaded PDFs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to render the front.ejs template (PDF upload form)
app.get('/upload-pdf', (req, res) => {
    res.render('front', { title: 'PDF Translator' }); // Render EJS with title
});

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Encode the filename before saving it
        const encodedFilename = encodeURIComponent(file.originalname);
        cb(null, Date.now() + '-' + encodedFilename); // Save the file with encoded name
    },
});
const upload = multer({ storage: storage });

// Route to render the front.ejs template (PDF upload form)
app.get('/', (req, res) => {
    res.render('front', { title: 'PDF Translator' }); // Render EJS with title
});

// Route to handle PDF upload
app.post('/upload', upload.single('pdf'), async(req, res) => {
    try {
        const filePath = req.file.path;
        const originalPdf = await fs.readFile(filePath);

        // Parse the PDF to extract text
        const pdfData = await pdfParse(originalPdf);
        const originalText = pdfData.text;

        // Translate the text
        const translatedText = await translateText(originalText, 'gu');

        // Embed Gujarati font and create a translated-only PDF
        const gujaratiFontPath = path.join(__dirname, 'fonts', 'AnekGujarati-VariableFont_wdth,wght.ttf');
        const translatedPdfBytes = await createTranslatedPdf(translatedText, gujaratiFontPath);

        const outputPdfPath = path.join(__dirname, 'uploads', `translated_${req.file.filename}`);
        await fs.writeFile(outputPdfPath, translatedPdfBytes);

        // Send back the link to download the translated PDF
        res.render('front', {
            title: 'PDF Translator',
            translatedPdfPath: `/uploads/${encodeURIComponent('translated_' + req.file.filename)}`,
        });

        // Clean up the uploaded file
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('Error processing file');
    }
});

// Function to create a translated PDF with only Gujarati text
async function createTranslatedPdf(translatedText, fontPath) {
    const pdfDoc = await PDFDocument.create(); // Creating a new PDF

    // Register fontkit to use custom fonts
    pdfDoc.registerFontkit(fontkit);

    // Embed custom font (Gujarati font)
    const fontBytes = await fs.readFile(fontPath);
    const customFont = await pdfDoc.embedFont(fontBytes);

    // Add a page to the new PDF
    const page = pdfDoc.addPage([600, 850]); // You can adjust the size of the page
    const { height } = page.getSize();

    // Split the translated text into lines (adjust line breaks as needed)
    const translatedLines = translatedText.split('\n');
    let lineIndex = 0;

    // Iterate through each line and add it to the page
    for (let line of translatedLines) {
        if (lineIndex * 12 > height - 100) break; // Stop adding text if the page is full
        page.drawText(line, {
            x: 50,
            y: height - 100 - lineIndex * 15, // Adjust Y-position for new line
            size: 12,
            font: customFont,
            color: rgb(0, 0, 0), // Black text color
        });
        lineIndex++;
    }

    return await pdfDoc.save();
}

// Function to translate text
async function translateText(text, targetLang) {
    try {
        const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
            params: {
                client: 'gtx',
                sl: 'en', // Source language (English)
                tl: targetLang, // Target language (Gujarati)
                dt: 't', // Request translation
                q: text,
            },
        });

        // Extract translated text from the response
        const translatedText = response.data[0].map((item) => item[0]).join('');
        return translatedText;
    } catch (error) {
        console.error('Error during translation:', (error.response && error.response.data) || error.message);
        throw new Error('Translation failed');
    }
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});