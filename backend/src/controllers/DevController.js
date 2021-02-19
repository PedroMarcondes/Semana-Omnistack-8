const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            //$and = verifica todas as condições
            $and: [
                { _id: { $ne: user } }, //$ne (not equal) = não seja igual a usuário
                { _id: { $nin: loggedDev.likes } }, //$nin (not in) = não esteja nessa lista(lista de likes do usuário)
                { _id: { $nin: loggedDev.dislikes } },
            ],
        })

        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        //Verifica se usuário ja existe
        const userExist = await Dev.findOne({ user: username });

        if (userExist) {
            return res.json(userExist);
        }

        //await - a função é asyncrona
        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({ 
            name,
            user: username,
            bio,
            avatar

            //Retira as infos da api do github e insere no model Dev
         })

        return res.json(dev);
    }
};

/*
Boas praticas, o controller não pode ter mais métodos do que os 5 metodos fundamentais
INDEX - Lista todos os dados
SHOW - Retorna um item
STORE - Salva o novo item na tabela
/ UPDATE / DELETE
*/