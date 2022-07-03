
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './detail.css'
import api from '../../services/api'

import Logo from '../../assets/logo.png'
import Header from '../../components/Header'

import { AiOutlineUser, AiOutlineCalendar, AiOutlineException } from "react-icons/ai";


export default function Detail() {

    const [cpf, setCpf] = useState('')
    const [dados, setDados] = useState(null)
    const [dadoss, setDadoss] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => { }, [dados])

    function buscarAlugueis(e) {

        if (cpf == '') {
            return alert('Informe seu CPF')
        }
        e.preventDefault()
        const data = {
            cpf
        }
        api.get(`Cliente/${cpf}`, data).then(response => {
            setDados(response.data)
            setDadoss(response.data)
            setLoad(true)
            console.log(response.data)
        }).catch((error) => {
            return alert(`Cpf ${cpf} não foi encontrado.`)
        })
    }

    function removerLocacao(id) {
        api.delete(`Locacao/${id}`).then(() => {
            alert("Locaçao removida com sucesso.")
        }).catch((error) => {
            alert(`Não foi possível remover esta locação. Tente novamente `)
        })
    }
    return (
        <div id='container_detail'>
            <Header img={Logo} text="Veja o que você alugou!" content="Informe seu cpf para verificar tudo que você alugou" />


            <form className='container_detail_form' onSubmit={buscarAlugueis}>
                <div className='container_detail_inputs'>
                    <label className='text_addmovie_input_label'>Cpf</label>
                    <input type="text" className='input' value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </div>

                <input type="submit" value="Pesquisar" className='input_submit_detail' />
            </form>

            {load ? <div className='container_detail_box'>
                <div className="container_detail_box_row ">
                    <AiOutlineUser size={20} color="#000" />
                    <p className="text_detail_box">{dados?.name}</p>
                    <div />
                </div>

                <div className="container_detail_box_row ">
                    <AiOutlineException size={20} color="#000" />
                    <p className="text_detail_box">{dados?.cpf}</p>
                    <div />
                </div>

                <div className="container_detail_box_row ">
                    < AiOutlineCalendar size={20} color="#000" />
                    <p className="text_detail_box">{dados?.dataNascimento.split("T", 10)[0]}</p>
                    <div />
                </div>
                {dados?.locacoes.map(item => {
                    return (
                        <div className='container_content_box_row_data'>
                            <p className='text_detail_loc'>{dados?.name} você alugou filme(s) em: {item.dataLocacao.split("T", 10)[0]} {/* {Intl.DateTimeFormat('pt-BR').format(new Date(item.dataLocacao.split("T", 10)[0])) + 1} */} e precisa entrega-los em {item.dataDevolucao.split("T", 10)[0]} {/* {Intl.DateTimeFormat('pt-BR').format(new Date(item.dataDevolucao.split("T", 10)[0]))} */} </p>
                            <div className='container_content_box_update_row'>
                                <Link to={`/atualizarlocacao/${item.id}`} className='text_content_box_update_row'>Atualizar</Link>
                                <p className='text_content_box_delete_row' onClick={() => removerLocacao(item.id)}>Excluir</p>
                            </div>
                        </div>
                    )
                })}

            </div> : <p></p>}

        </div>
    )
}