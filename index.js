
const express = require('express');
const app = express();
app.use(express.json());
const PORT = 80;



let id = 1;

// Rank Entry
const rankEntry = {
    id: id,
    topic: "My favorite cats",
    1: "Calico",
    2: "Tabby",
    3: "Sphynx",
    4: "Siamese",
    5: "Maine Coon",
    createdAt: new Date()
}

const entries = [];

app.get('/', (req, res) => {
    res.send(entries);
});

app.post('/entry', (req, res) => {
    const entry = req.body;
    entry.id = id++;
    entry.createdAt = new Date()
    entries.push(entry);
    res.send(entry);
})

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});