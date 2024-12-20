const Element = require('../models/Element');

exports.createElement = async (req, res) => 
{
    try 
    {
        const element = new Element({ ...req.body, user: req.userId });
        await element.save();
        res.status(201).json(element);
    }
    catch (err) 
    {
        res.status(400).json({ error: err.message });
    }
};

exports.getElements = async (req, res) => 
{
    try 
    {
        const { collectionId } = req.query;                    // Filtrar por colección si se proporciona
        const query            = { user: req.userId };         // Aseguramos que solo se obtienen los elementos del usuario
        if (collectionId) { query.collection = collectionId; } // Agregamos el filtro por colección si está presente

        const elements = await Element.find(query).populate('collection');
        res.status(200).json(elements);
    }
    catch (err) 
    {
        res.status(500).json({ error: err.message });
    }
};

// Controlador para eliminar un elemento
exports.deleteElement = async (req, res) => 
{
    try 
    {
        const elementId = req.params.id;
        const element   = await Element.findByIdAndDelete({ _id: elementId, user: req.userId });

        if (!element) 
        {
            return res.status(404).json({ message: 'Element not found or you are not authorized to delete it' });
        }

        res.status(200).json({ message: 'Element deleted successfully' });
    } 
    catch (err)
    {
        res.status(500).json({ error: err.message });
    }
};



exports.updateElement = async (req, res) => 
{
    try 
    {
        const { id }                = req.params;
        const { name, description } = req.body;
        const element               = await Element.findOne({ _id: id, user: req.userId }); // Buscar el elemento por ID y asegurarse de que el usuario es el propietario

        if (!element)
        {
            return res.status(404).json({ message: 'Element not found or you are not authorized to edit it' });
        }

        // Actualizar los campos del elemento
        element.name        = name || element.name;  // Solo actualiza si se pasa el campo
        element.description = description || element.description;

        // Guardar cambios
        await element.save();

        res.status(200).json({ message: 'Element updated successfully', element });
    } 
    catch (err) 
    {
        res.status(500).json({ error: err.message });
    }
};

