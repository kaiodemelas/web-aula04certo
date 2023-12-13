const mongoose = require('mongoose');
const schema = mongoose.schema;

var FraseSchema = new mongoose.Schema({
        autor:String,
        frase:String
},
{
    versionKey: false, collection: 'frases'
})

module.exports = mongoose.model("Frase",FraseSchema);