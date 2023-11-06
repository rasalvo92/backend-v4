const { Product } = require('../models/product');
const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// ProductList - Filtrar por categoría (Query Parameters)
router.get('/', async (req, res) => {
    // localhost:4000/api/v1/products?categories=123123131,1231313
    let filter = {};
    if (req.query.categories) {
        filter = { category: { $in: req.query.categories.split(',') } }; // Usar $in para buscar en una matriz
    }

    try {
        const productList = await Product.find(filter).populate('category');
        if (!productList) {
            return res.status(500).json({ success: false });
        }
        res.send(productList);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Producto por ID (URL Parameter)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
        res.send(product);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Crear un nuevo producto (POST)
router.post('/', async (req, res) => {
    try {
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(400).send('Categoría inválida');
        }

        const product = new Product({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            image: req.body.image,
            countInStock: req.body.countInStock
        });

        await product.save();
        res.send(product);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Actualizar un producto (PUT)
router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('ID de Producto Inválido');
    }

    try {
        const category = await Category.findById(req.body.category);
        if (!category) {
            return res.status(400).send('Categoría inválida');
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                image: req.body.image,
                countInStock: req.body.countInStock
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        res.send(product);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Eliminar un producto (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        if (product) {
            return res.status(200).json({ success: true, message: 'Producto eliminado.' });
        } else {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Contar la cantidad de productos
router.get('/get/count', async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.send({ productCount });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
