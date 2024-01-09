const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;

app.post('/completions', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'how are you?' }],
            max_tokens: 150,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json();
        res.send(data);

    } catch (error) {
        console.error(error)
    }
})


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });


