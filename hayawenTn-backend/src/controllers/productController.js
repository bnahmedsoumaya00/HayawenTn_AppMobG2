// src/controllers/productController.js - Contrôleur des produits
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../models/productModel');

/**
 * @desc    Récupérer tous les produits avec filtres
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = async (req, res) => {
  try {
    console.log('📦 Get products with filters:', req.query);

    const filters = {
      search: req.query.search || '',
      category: req.query.category || '',
      animal_type: req.query.animal_type || '',
      min_price: req.query.min_price || 0,
      max_price: req.query.max_price || 999999,
      page: req.query.page || 1,
      limit: req.query.limit || 10
    };

    const result = await getAllProducts(filters);

    console.log(`✅ Found ${result.products.length} products`);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('❌ Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits'
    });
  }
};

/**
 * @desc    Récupérer un produit par ID
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`📦 Get product ID: ${id}`);

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    console.log(`✅ Product found: ${product.name}`);

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('❌ Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du produit'
    });
  }
};

/**
 * @desc    Créer un nouveau produit
 * @route   POST /api/products
 * @access  Private (Admin uniquement - pour l'instant tout le monde)
 */
exports.createProductHandler = async (req, res) => {
  try {
    const { name, description, price, category, animal_type, image_urls, stock } = req.body;

    console.log('📦 Create product:', name);

    // Validation
    if (!name || !price || !category || !animal_type) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir nom, prix, catégorie et type d\'animal'
      });
    }

    // Validation du prix
    if (price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Le prix doit être positif'
      });
    }

    // Validation de la catégorie
    const validCategories = ['food', 'toys', 'accessories', 'healthcare', 'other'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Catégorie invalide'
      });
    }

    // Validation du type d'animal
    const validAnimalTypes = ['dog', 'cat', 'bird', 'fish', 'rabbit', 'other'];
    if (!validAnimalTypes.includes(animal_type)) {
      return res.status(400).json({
        success: false,
        message: 'Type d\'animal invalide'
      });
    }

    const product = await createProduct({
      name,
      description,
      price,
      category,
      animal_type,
      image_urls: image_urls || [],
      stock: stock || 0
    });

    console.log(`✅ Product created with ID: ${product.id}`);

    res.status(201).json({
      success: true,
      message: 'Produit créé avec succès',
      data: product
    });
  } catch (error) {
    console.error('❌ Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du produit'
    });
  }
};

/**
 * @desc    Mettre à jour un produit
 * @route   PUT /api/products/:id
 * @access  Private (Admin)
 */
exports.updateProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log(`📦 Update product ID: ${id}`);

    // Vérifier si le produit existe
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    await updateProduct(id, updates);

    console.log(`✅ Product updated: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Produit mis à jour avec succès'
    });
  } catch (error) {
    console.error('❌ Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du produit'
    });
  }
};

/**
 * @desc    Supprimer un produit
 * @route   DELETE /api/products/:id
 * @access  Private (Admin)
 */
exports.deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`📦 Delete product ID: ${id}`);

    // Vérifier si le produit existe
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    await deleteProduct(id);

    console.log(`✅ Product deleted: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Produit supprimé avec succès'
    });
  } catch (error) {
    console.error('❌ Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du produit'
    });
  }
};

module.exports = exports;