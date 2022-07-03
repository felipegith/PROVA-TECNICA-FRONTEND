
import { useEffect, useState } from 'react';
import { AiOutlineUser, AiOutlineVideoCamera, AiOutlineException } from "react-icons/ai";

import './dash.css'
import Header from "../../components/Header";
import Logo from '../../assets/logo.png'
import api from '../../services/api';


export default function Dash() {

    const [dados, setDados] = useState([])
    const [filmes, setFilmes] = useState([])
    const [populares, setPopulares] = useState([])
    const [segundoclient, setSegundoClient] = useState([])
    const [tresFilmes, setTresFilmes] = useState([])
    const [filmesAlugados, setFilmesAlugados] = useState([])

    function atrasoDevolucao() {
        api.get("/Cliente/Devolucao").then(response => {
            setDados(response.data)
        }).catch((error) => {
            alert(`Não foi possivel realizar a solicitação. Tente novamente `)
        })
    }

    function naoAlugados() {
        api.get("/Filme/NaoAlugados").then(response => {
            setFilmes(response.data)
        }).catch((error) => {
            alert(`Não foi possivel realizar a solicitação. Tente novamente `)
        })
    }

    function segundoCliente() {
        api.get("/Cliente/SegundoCliente").then(response => {
            setSegundoClient(response.data)
            console.log(response.data)
        }).catch((error) => {
            alert(`Não foi possivel realizar a solicitação. Tente novamente `)
        })
    }
    function cincoFilmes() {
        api.get("Filme/CincoFilmes").then(response => {
            setPopulares(response.data)
        }).catch((error) => {
            alert(`Não foi possivel realizar a solicitação. Tente novamente `)
        })
    }

    function tresFilmesMenosAlugados() {
        api.get("Filme/TresFilmes").then(response => {
            setTresFilmes(response.data)
        }).catch(() => {
            console.log("Não foi possivel verificar os três filmes menos alugados")
        })
    }

    function todosFilmesAlugados() {
        api.get("Locacao").then(response => {
            setFilmesAlugados(response.data)
        }).catch(() => {
            alert("Não foi possível visualizar os filmes alugados pela locadora")
        })
    }

    useEffect(() => {
        atrasoDevolucao()
        naoAlugados()
        cincoFilmes()
        segundoCliente()
        tresFilmesMenosAlugados()
        todosFilmesAlugados()
    }, [])

    return (
        <div>
            <Header img={Logo} text="Dashboard da locadora" content="Veja o resumo de informações da locadora" />

            <div className="container_dash">
                <div className='container_dash_box'>
                    <div className='container_dash_box_content'>
                        <p className='text_dash_box_title'>Clientes com atraso na devolução</p>
                        {dados.map(item => {
                            return (
                                <div className='container_dash_devo'>
                                    <div className='container_dash_devo_row'>
                                        <AiOutlineUser size={16} color="##284180" />
                                        <p className='text_dash_data'>{item?.cl.name}</p>
                                        <div />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='container_dash_box'>
                    <div className='container_dash_box_content'>
                        <p className='text_dash_box_title'>Filmes que nunca foram alugados</p>
                        {filmes.map(item => {
                            return (
                                <div className='container_dash_devo'>
                                    <div className='container_dash_devo_row'>
                                        <AiOutlineVideoCamera size={16} color="##284180" />
                                        <p className='text_dash_data'>{item?.titulo == null ? <p>Todos os filmes foram alugados</p> : <p>{item?.titulo}</p>}</p>
                                        <div />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='container_dash_box'>
                    <div className='container_dash_box_content'>
                        <p className='text_dash_box_title'>Cinco filmes mais alugados no último ano</p>
                        {populares.map(item => {
                            return (
                                <div className='container_dash_devo'>
                                    <div className='container_dash_devo_row'>
                                        <AiOutlineUser />
                                        <p className='text_dash_data'>{item.titulo}</p>
                                        <div />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='container_dash_box'>
                    <div className='container_dash_box_content'>
                        <p className='text_dash_box_title'>Três filmes menos alugados da última semana.</p>
                        {tresFilmes.map(item => {
                            return (
                                <div className='container_dash_devo'>
                                    <div className='container_dash_devo_row'>
                                        <AiOutlineUser />
                                        <p className='text_dash_data'>{item?.titulo}</p>
                                        <div />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='container_dash_box'>
                    <div className='container_dash_box_content'>
                        <p className='text_dash_box_title'>O segundo cliente que mais alugou filmes.</p>
                        {segundoclient.map(item => {
                            return (
                                <div className='container_dash_devo'>
                                    <div className='container_dash_devo_row'>
                                        <AiOutlineUser />
                                        <p className='text_dash_data'>{item?.name}</p>
                                        <div />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='container_dash_box'>
                    <div className='container_dash_box_content'>
                        <p className='text_dash_box_title'>Filmes que foram alugados</p>
                        {filmesAlugados.map(item => {
                            return (
                                <div className='container_dash_devo'>
                                    <div className='container_dash_devo_row'>
                                        <AiOutlineUser />
                                        <p className='text_dash_data'>{item.fl?.titulo}</p>
                                        <div />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    )
}