const express = require("express");
const router = express.Router();
const validator = require('express-joi-validation').createValidator({})
// const controllerCtrl = require('../controller/controller');
// const homeSchema = require('../validators/home.validators');
// const categoriesCtrl = require('../controller/products-ctegories/categories.controller');
// const subCategoriesCtrl = require('../controller/products-ctegories/sub-ctegories.controller');
// const sub_subCategoriesCtrl = require('../controller/products-ctegories/sub_sub-ctegories.controller');
// const productsCtrl = require('../controller/products-ctegories/products.controller');
// const { upload } = require("../helper/imageUploader");

//Auth Routes
router.get('/login');
router.get('/signup');
router.get('/forgotPassword');

//Categories routes
// router.get('/categories', categoriesCtrl.getAllCategories);
// router.post('/categories', categoriesCtrl.createCategory);
// router.put('/categories/:id', categoriesCtrl.updateCategory);
// router.delete('/categories/:id', categoriesCtrl.deleteCategory);
//subCategories routes
// router.post('/sub-categories', subCategoriesCtrl.createSubCategory);
// router.get('/sub-categories/:id', subCategoriesCtrl.getAllSubCategories);
// router.put('/sub-categories/:id', subCategoriesCtrl.updateSubCategory);
// router.delete('/sub-categories/:id', subCategoriesCtrl.deleteSubCategory);
//sub-subCategories routes
// router.post('/sub-sub-categories', sub_subCategoriesCtrl.createsub_SubCategory);
// router.get('/sub-sub-categories/:id', sub_subCategoriesCtrl.getAllsub_SubCategories);
// router.put('/sub-sub-categories/:id', sub_subCategoriesCtrl.updatesub_SubCategory);
// router.delete('/sub-sub-categories/:id', sub_subCategoriesCtrl.deletesub_SubCategory);
//Products routes
// router.post('/products', productsCtrl.createProduct);
// router.post('/products/image', upload.single("image"), productsCtrl.addProductImages);
// router.get('/products', productsCtrl.getAllProducts);
// router.get('/products/:id', productsCtrl.getProductsByid);
// router.delete('/products/:id', productsCtrl.deleteProduct);
// router.put('/products/:id', productsCtrl.updateProduct);
//Related Products routes
// router.put('/products/:id', productsCtrl.updateProduct);

// Customer Queries routes
// router.post('/v1/customer-queries', controllerCtrl.CustomerQuery);
// router.post('/v1/sub-offers', validator.body(homeSchema.SubscribeOffersSchema), controllerCtrl.SubscribeOffers);
// router.post('/v1/sub-newsletter', validator.body(homeSchema.SubscribeNewsletterSchema), controllerCtrl.SubscribeNewsletter);

module.exports = router