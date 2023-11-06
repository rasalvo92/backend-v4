const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();


router.get('/', categoryController.getCategories); // categorías
router.post('/', categoryController.createCategory); // add. categoría
router.put('/:categoryId', categoryController.updateCategory); // refresh cat x ID
router.delete('/:categoryId', categoryController.deleteCategory); // delete cat x ID



// Listado de categorías
router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).json({ success: true, data: categoryList });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener una categoría por su ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Categoría con ese ID no encontrada' });
        }
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Agregar una categoría
router.post('/', async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
        });

        const newCategory = await category.save();

        if (!newCategory) {
            return res.status(400).json({ success: false, message: 'No se puede crear la categoría' });
        }

        res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Actualizar una categoría por su ID
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
            },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Eliminar una categoría por su ID
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);

        if (category) {
            return res.status(200).json({ success: true, message: 'Categoría eliminada' });
        } else {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
