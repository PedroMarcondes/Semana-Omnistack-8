import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import itsamatch from '../assets/itsamatch.png';

//useState = api React Hux
export default function Main({ match }){
    const [users, setUsers] = useState([]); // [] => cria um array vazio
    const [matchDev, setMatchDev] = useState(null);

    //faz a chamada api
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            })

            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id]);

    //se conecta com o websockets
    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        });

        socket.on('match', dev => {
            setMatchDev(dev); 
        })
    }, [match.params.id]);

    //dica = ação gerada apartir de interação do usuário função começa com handle (usado para padronizar tudo que é feito pelo user)
    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id },
        })

        setUsers(users.filter(user => user._id !== id)); 
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id },
        })

        setUsers(users.filter(user => user._id !== id)); 
        //filtra e mostra todos id diferentes do id pego do handleDislike(id)
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev"/>
            </Link>
            { users.length > 0 ? ( //if ternário {condição > 0 ? if : else}
                <ul>
                {users.map(user =>( // user => () = { return x }
                <li key={user._id}>
                    <img src={user.avatar} alt={user.name} />
                    <footer>
                        <strong>{user.name}</strong>
                        <p>{user.bio}</p>
                    </footer>

                    <div className="buttons">
                        {/* () => [declara uma nova função para evitar de rodar automaticamente a função sempre que passar, rodando somente quando clica] */}
                        <button type="button" onClick={() => handleDislike(user._id)}> 
                            <img src={dislike} alt="Dislike" />
                        </button>
                        <button type="button" onClick={() => handleLike(user._id)}>
                            <img src={like} alt="Like" />
                        </button>
                    </div>

                </li>
                ))}
            </ul>  
            ) : (
                <div className="empty">Acabou :(</div>
            ) } 

            { matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="It's a match"/>

                    <img className="avatar" src={matchDev.avatar} alt=""/>
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>

                    <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>
                </div>
            ) }         
        </div>
    )
}