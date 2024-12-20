const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' } // Referencia a la colección
}, {
    suppressReservedKeysWarning: true // Suprime la advertencia sobre el uso de 'collection'
});


module.exports = mongoose.model('Element', elementSchema);
