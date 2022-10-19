
const express = require('express');
const app = express();

const PORT = 80;
const cors = require('cors');



app.use(express.json());
app.use(cors({origin: '*'}));



let id = 1;
entries = [{
    content: 'hi'
}];

app.get('/entries', (req, res) => {
    res.send(entries);
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    const entry = entries.find(e => e.id === +id);
    res.send(entry);
});

app.post('/entry', (req, res) => {
    const entry = req.body;
    entry.id = id++;
    entry.createdAt = new Date();
    entries.push(entry);
    res.send(entry);
});

app.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = entries.findIndex(e => e.id === +id);
    entries.splice(index, 1);
    res.send(`Deleted Entry with id: '${id}'.`)
});


app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});