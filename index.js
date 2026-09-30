const express = require('express');
const app = express();
const dataFile = 'data.json';
const fs = require('node:fs/promises');

app.get('/gamer/:navn',async (req, res) => {
    try {
        const filIndhold = await fs.readFile(dataFile, 'utf8');
        const gamers = JSON.parse(filIndhold);

        const søgteNavn = req.params.navn.toLowerCase()
        const gamer = gamers.find(g => g.navn.toLowerCase() === søgteNavn);

        if (!gamer) {
            return res.status(404).send(`Vi kunne ikke finde gameren "${req.params.navn}"`);
        }
        res.json(gamer);
    }catch(err) {
        console.error('fejl i /gamer/:navn', err);
        res.status(500).send('serverfejl');
    }
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});