Only click physic 
 PDF Translator: Study Material Translation to Gujarati

 ✨ Team Name: Error Developer

---

 🔧 Project Overview
The PDF Translator is a basic yet powerful application designed to help students translate their study materials from English to Gujarati. This tool processes PDF files, extracts the text, translates the content using the Google Translate API, and generates a new PDF with the translated Gujarati text.

---

> 🎯 Key Features
- Upload PDFs: Users can upload any PDF file containing study material.
- Text Extraction: The app extracts text from the uploaded PDF.
- Gujarati Translation: Translates extracted text to Gujarati using the Google Translate API.
- Custom Fonts: Embeds a custom Gujarati font for accurate rendering.
- Download Translated PDF: Provides a downloadable link for the translated PDF file.

---

> 🧰 Tech Stack
- Backend: Node.js, Express.js
- Libraries:
  - `pdf-parse`: Extract text from PDF files.
  - `pdf-lib`: Create and manipulate PDF files with custom fonts.
  - `multer`: Handle file uploads.
  - `fs-extra`: File system utilities.
  - `axios`: HTTP requests for Google Translate API.
  - `fontkit`: Embed custom fonts in PDFs.
- **Frontend:** EJS (Embedded JavaScript) templates for rendering views.

---

> 🔍 Folder Structure
```
root
├── frontend
│   ├── front.ejs  # Main HTML form for uploading PDFs
│   └── styles.css # Styles for the frontend (optional)
├── uploads        # Directory for storing uploaded and translated PDFs
├── fonts          # Directory for custom Gujarati fonts
├── app.js         # Main server file
└── package.json   # Dependencies and scripts
```

---

> ⏳ How It Works
1. **Upload PDF**: Navigate to `http://localhost:3000/upload-pdf` and upload your PDF.
2. **Extract Text**: The app uses `pdf-parse` to extract text from the uploaded PDF.
3. **Translate**: The text is translated to Gujarati via the Google Translate API.
4. **Generate PDF**: A new PDF is created with translated text using `pdf-lib` and a custom Gujarati font.
5. **Download**: A link to download the translated PDF is provided on the page.

---

> 🔬 Installation
> Prerequisites
- Node.js installed on your machine.
- Custom Gujarati font file (e.g., `AnekGujarati-VariableFont_wdth,wght.ttf`) placed in the `fonts` directory.

> Steps
1. Clone the repository:
   ```bash
   git clone <repository-link>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node app.js
   ```
4. Open your browser and visit:
   ```
   http://localhost:3000/upload-pdf
   ```

---

> 🚀 Usage
1. Upload a PDF file with English text.
2. Click on the **Translate** button.
3. Download the Gujarati-translated PDF from the provided link.

---

> ⚠ Error Handling
- If the file upload fails, ensure the `uploads` directory exists and has proper permissions.
- If translation fails, verify your internet connection and Google Translate API availability.
- Logs and errors are printed in the console for debugging.

---

> 📈 Future Enhancements
- Add support for multiple languages.
- Include formatting preservation for PDFs.
- Add a user authentication system.
- Optimize the app for larger PDFs.

---

> 💪 Team Members
- **Error Developer**

---

> 🔒 License
This project is open-source and available under the MIT License.

