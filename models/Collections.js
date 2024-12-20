const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // El usuario propietario de la colección
    elements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Element' }] // Elementos que pertenecen a esta colección
});

module.exports = mongoose.model('Collections', collectionSchema);
