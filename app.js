const axios = require('axios');

const API_KEY = 'your-yandex-api-key'; // Replace with your API key

async function translateTextToGujarati(text) {
    const response = await axios.post('https://translate.yandex.net/api/v1.5/tr.json/translate', null, {
        params: {
            key: API_KEY,
            text: text,
            lang: 'en-gu' // Translate from English to Gujarati
        }
    });

    return response.data.text[0];
}

translateTextToGujarati("Hello, how are you?")
    .then(translatedText => {
        console.log(translatedText); // Output will be translated text in Gujarati
    })
    .catch(error => {
        console.error('Error:', error);
    });