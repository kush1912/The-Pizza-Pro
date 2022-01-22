const homeController = require('./../http/controllers/homeController')
const authController = require('./../http/controllers/authController');
const cartController = require('./../http/controllers/customers/cartController');
const orderController = require('./../http/controllers/customers/orderController');
const guest = require('./../http/middlewares/guest');
function initRoutes(app){
  
  /* 
    The second parameter of all the CRUD operations are a callback functions 
    which have (req,res) as parameters to that function. homeController().index is passed as
    as a parameter which will have (req, res) parameters which will be available in the 
    homeController file now.
  */
  app.get('/', homeController().index);
  app.get('/cart', cartController().index);
  app.get('/login', guest, authController().login);
  app.get('/register', guest, authController().register);
  app.post('/login',authController().postLogin);
  app.post('/register',authController().postRegister);
  app.post('/update-cart', cartController().update);
  app.post('/orders', orderController().store);
  app.post('/logout', authController().logout);
}

module.exports = initRoutes