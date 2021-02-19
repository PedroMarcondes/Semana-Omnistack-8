const { Schema, model  } = require('mongoose');

//Schema vai montar qual a estrutura do meu BD pra armazenar um Dev dentro
const DevSchema = new Schema({
    name: {
        type: String,
        required:true,
    },
    user: {
        type: String,
        required:true,
    },
    bio:String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId, //formato do ID do mongoDB
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
    //Cria as colunas createdAt, updatedAt nos registros (preenche automatico)
    timestamps: true,
});

module.exports = model('Dev', DevSchema);