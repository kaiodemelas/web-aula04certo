const express = require('express');
const app = express();

app.use(express.json());

const frases = [
    {id: 10, autor: 'Maria Antonia', frase: "Frase da Maria"},
    {id: 20, autor: 'Fernando Santos', frase: "Frase do Fernando"},
    {id: 30, autor: 'Mauro Bastos', frase: "Frase do Mauro"},
    {id: 40, autor: 'Tiago Alves', frase: "Frase do Tiago"},
];

app.get('/', (req, res) => {
    res.send("Prog. Web - Hello World.");
})

app.get('/frases', (req,res) => {
    res.send(frases);
})

app.post('/frases',(req, res) => {
    frases.push(req.body);
    res.status(201).send();
})

app.delete('/frases/:id', (req, res) => {
    let id = req.params.id;
    let index = frases.findIndex((frase) => frase.id == id);
    if (index == -1) {
        res.status(404).send();
    } else {
        frases.splice(index, 1);
        res.status(200).send();
    }
})

app.put('/frases/:id', (req,res) => {
    let id = req.params.id;
    let frase = req.body;
    let index = frases.findIndex((frase) => frase.id == id);
    if (index == -1) {
        res.status(404).send();
    } else {
        frases[index].autor = frase.autor;
        frases[index].frase = frase.frase;
        res.status(200).send();
    }
})

app.get('/produtos', (req, res) => {
    res.send("Prog. Web - Produtos.");
})

const port=8080;
app.listen(port, (err) => {
    if (err) {
        console.error("Erro na aplicacao", err);
    }
    console.log(`Aplicacao escutando na porta: ${port}`);
})