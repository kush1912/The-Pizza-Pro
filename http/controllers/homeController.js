function homeController(){  //factory functions
    return {
        index(req,res){
            res.send("Hello...123");
        }
    }
}

module.exports = homeController