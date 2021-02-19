import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login({ history }) { //todas as rotas herdam uma propriedade chamada history do react-router-dom
    const [username, setUsername] = useState(''); 
    //acessa ou cadastra o username (para criar uma variavel que vai ser manipulada)

    async function handleSubmit(e) { //quando der submit roda a função (evento)
        e.preventDefault(); //previne o comportamento de redirecionar para outra pag

        //Pega as infos da api do node com o username
        const response = await api.post('/devs', {
            username, //short sintax pois (username:username tem nome igual ao valor)
        });

        const { _id } = response.data;

        //o history serve para fazer a navegação, podendo redirecionar para outras rotas
        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" /> {/* tag = img / propriedades = src, alt */}
                <input 
                placeholder="Digite seu usuário no Github"
                value={username}
                onChange={e => setUsername(e.target.value)} //e.target.value = valor que foi digitado
                //a função é disparada sempre que tem uma alteração no input (cria um evento)
                />
                <button type="submit">Enviar</button>
            </form>         
        </div>
    );    
}