const homeController = require('./../http/controllers/homeController')
const authController = require('./../http/controllers/authController');
const cartController = require('./../http/controllers/customers/cartController');
const orderController = require('./../http/controllers/customers/orderController');
const adminOrderController = require('../http/controllers/admin/adminOrderController');
const guest = require('./../http/middlewares/guest');
const auth = require('./../http/middlewares/auth'); 

  /* 
    The second parameter of all the CRUD operations are a callback functions 
    which have (req,res) as parameters to that function. homeController().index is passed as
    as a parameter which will have (req, res) parameters which will be available in the 
    homeController file now.
  */

function initRoutes(app){
  app.get('/', homeController().index);
  app.get('/cart', cartController().index);
  app.get('/login', guest, authController().login);
  app.get('/register', guest, authController().register);
  app.post('/login',authController().postLogin);
  app.post('/register',authController().postRegister);
  app.post('/update-cart', cartController().update);
  app.post('/logout', authController().logout);

  //Customer Routes
  app.post('/orders', auth, orderController().store);
  app.get('customers/order', auth, orderController().index);

  //Admin ROutes
  app.get('/admin/orders', auth, adminOrderController().index);
}


// Needs more work

module.exports = initRoutes