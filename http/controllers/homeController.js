const Menu = require('./../../models/menu');

function homeController(){  //factory functions
    return {
        //fetch the data
        async index(req,res){
            const pizzaMenu =  await Menu.find()
            console.log(`Pizza Menu fetched...${pizzaMenu}`);
            return res.json({pizzaMenu});
        }
    }
}

module.exports = homeController