const express = require('express');
const mongoose = require('mongoose');
const Frase = require('./frase.model');

const app = express();
app.use(express.json());

const db_host = 'localhost';
const db_port = 27017;
const db_db = 'frases';
const mongoURI = `mongodb:\/\/${db_host}:${db_port}/${db_db}`;

mongoose.connect(mongoURI,{useNewUrlParser: true});

app.get('/', (req, res) => {
    res.send("Prog. Web - Hello World.");
})

app.get('/frases', (req,res) => {
    Frase.find({})
        .then((frases) => {
            res.send(frases);
        })
        .catch((err) => {
            res.status(500).send();
        })

})

app.post('/frases',(req, res) => {
    let frase = {
        autor: req.body.autor,
        frase: req.body.frase
    }
    Frase.create(frase)
    .then((f) => {
        res.status(201).send(f);
    })
    .catch((err) => {
        res.status(500).send();
    })
})

app.post('/frases', (req, res) => {
    if (!Array.isArray(req.body)) {
        return res.status(400).send({ error: 'O corpo da solicitação deve ser um array de frases.' });
    }

    const frases = req.body.map(item => ({
        autor: item.autor,
        frase: item.frase
    }));

    Frase.bulkCreate(frases)
        .then((frasesCriadas) => {
            res.status(201).send(frasesCriadas);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ error: 'Erro ao criar frases.' });
        });
});

app.delete('/frases/:id', (req, res) => {
    let id = req.params.id;
    Frase.findByIdAndDelete(id)
        .then(() => res.status(200).send())
        .catch(() =>res.status(404).send())
})

app.put('/frases/:id', (req,res) => {

    let frase = req.body;
    let f = req.body;
    
    Frase.findById(id)
        .then((frase)=> {
            frase.autor = f.autor;
            frase.frase = f.frase;
            frase.save()
                .then((_) => res.status(200).send())
                .catch((err) => res.status(500).send())
        })
        .catch(err =>{
            res.status(404).send();
        })
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