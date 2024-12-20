const Collection = require('../models/Collections');
const Element = require('../models/Element');

exports.createCollection = async (req, res) => {
    try {
        const { name, description } = req.body;
        const collection = new Collection({
            name,
            description,
            user: req.userId // Asociar la colección al usuario
        });
        await collection.save();
        res.status(201).json(collection);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.addElementToCollection = async (req, res) => {
    try {
        const { collectionId, elementId } = req.body;

        // Buscar la colección
        const collection = await Collection.findById(collectionId);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }

        // Buscar el elemento
        const element = await Element.findById(elementId);
        if (!element || !element.user.equals(req.userId)) {
            return res.status(404).json({ message: 'Element not found or unauthorized' });
        }

        // Asociar el elemento a la colección
        element.collection = collectionId;
        await element.save();

        // Agregar el elemento a la lista de elementos de la colección
        collection.elements.push(elementId);
        await collection.save();

        res.status(200).json({ message: 'Element added to collection', collection });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCollections = async (req, res) => {
    try {
        const collections = await Collection.find({ user: req.userId }).populate('elements');
        res.status(200).json(collections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
