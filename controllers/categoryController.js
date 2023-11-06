const { Category } = require('../models/category');



// Obtener todas las categorías
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, categories });
    }catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



// Add cat
exports.createCategory = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        });

        const savedCategory = await category.save();
        res.status(201).json({ success: true, category: savedCategory });
    }catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};



// Refresh cat x ID
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.categoryId,
            {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color,
            },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }

        res.status(200).json({ success: true, category: updatedCategory });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



// Delete cat x ID
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndRemove(req.params.categoryId);
        if (deletedCategory) {
            res.status(200).json({ success: true, message: 'Categoría eliminada' });
        } else {
            res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
