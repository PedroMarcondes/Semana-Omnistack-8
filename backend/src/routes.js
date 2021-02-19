const express = require('express');
const DevController = require("./controllers/DevController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

const routes = express.Router(); //Cria rota

//GET - Buscar algo, POST - Criar, PUT - Editar, DELETE

/*
routes.get('/', (req, res) => {
    return res.json( { message: `Oi ${req.query.name}`});
});
*/

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);


module.exports = routes;