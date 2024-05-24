const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController')


/**
 *  Customer Routes 
*/
router.get('/', customerController.homepage);
router.get('/about', customerController.about);
router.get('/addUser', customerController.addUser);
router.post('/addUser', customerController.postUser);
router.get('/view/:id', customerController.view);
router.get('/edit/:id', customerController.edit);
router.put('/edit/:id', customerController.editPost);
router.delete('/edit/:id', customerController.deleteUser);

router.post('/search', customerController.searchUser);





module.exports = router;