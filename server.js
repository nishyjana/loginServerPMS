const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.get('/login', async (req, res) => {
    try {

        const { clientId, clientSecret, scope } = req.query;
        // Request access token using client_credentials flow
        const tokenResponse = await axios.post(
            'https://login.microsoftonline.com/4258257d-d3fc-442c-9839-27f31a89da9e/oauth2/v2.0/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
                scope: scope,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const accessToken = tokenResponse.data.access_token;


        res.json({ access_token: accessToken });
    } catch (error) {
        console.error('Error fetching access token:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching the access token.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});