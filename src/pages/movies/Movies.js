
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AiOutlineVideoCamera, AiOutlineStop, AiOutlineFire } from "react-icons/ai";

import './movie.css'
import api from '../../services/api'
import Logo from '../../assets/logo.png'
import Header from '../../components/Header'
import Rolls from '../../assets/rolls.png'

export default function Movies() {
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        (() => {
            api.get("Filme").then(response => {
                setFilmes(response.data)
            }).catch((error) => {
                alert(`Não foi possível localizar os filmes. Tente novamente ${error}`)
            })
        })()

    }, [])

    function removerFilme(id) {
        api.delete(`Filme/${id}`).then(() => {
            alert("Filme removido com sucesso")
            setFilmes(filmes.filter(filme => filme.id !== id))
        }).catch((error) => {
            alert(`Não foi possível remover o filme. Tente novamente ${error}`)
        })
    }

    return (
        <div id="container_movies">
            <Header img={Logo} text="Ta afim de assistir um filme?" content="Fique por dentro do nosso catálogo de filmes" />
            <main className='container_main_movies'>
                <div className='container_main_movies_text'>
                    <h1 className='text_container_main_movies'>Esta buscando algum filme especifico? <Link to="/filme">Clique aqui</Link></h1>
                </div>

                {filmes.map(filme => {
                    return (
                        <div key={filme.id} className='container_main_movies_list'>
                            <div className='container_main_movies_box'>
                                <div className='container_main_movies_box_left'>
                                    <img src={Rolls} className="logo_box" />
                                </div>
                                <div className='container_main_movies_box_right'>
                                    <div className='container_main_movies_box_right_row'>
                                        <AiOutlineVideoCamera size={20} color="#284180" />
                                        <span className='text_main_movie_content'>{filme.titulo}</span>
                                        <div />
                                    </div>

                                    <div className='container_main_movies_box_right_row'>
                                        <AiOutlineStop size={20} color="#284180" />
                                        <div className='container_main_movies_classification'>
                                            <span className='text_main_movie_content'>{filme.classificacaoIndicativa}</span>
                                        </div>
                                        <div />
                                    </div>

                                    <div className='container_main_movies_box_right_row'>
                                        <AiOutlineFire size={20} color="#284180" />
                                        <span className='text_main_movie_content'>{filme.lancamento == 5 ? <p>Lançamento</p> : <p>Comum</p>}</span>
                                        <div />
                                    </div>
                                    <div className='container_main_movie_button'>
                                        <div className='container_main_movie_button_padding'>
                                            <Link to={`/alugar/${filme.id}`} className="text_link_movie">Alugar</Link>
                                        </div>
                                    </div>
                                    <div className='container_main_movie_button'>
                                        <div className='container_main_movie_button_padding_update'>
                                            <Link to={`/atualizarfilme/${filme.id}`} className="text_link_movie">Editar</Link>
                                        </div>
                                    </div>

                                    <div className='container_main_movie_button'>
                                        <div className='container_main_movie_button_padding_remove'>
                                            <button className='button' onClick={() => removerFilme(filme.id)}>Remover</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}