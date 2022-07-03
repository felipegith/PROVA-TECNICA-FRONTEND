
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { AiOutlineVideoCamera, AiOutlineStop, AiOutlineFire } from "react-icons/ai";

import Logo from '../../assets/logo.png'
import Header from "../../components/Header"
import Rools from '../../assets/rolls.png'
import './newmovie.css'
import api from '../../services/api'


export default function NewMovie() {
    const [id_Cliente, setId_Cliente] = useState('')
    const [id_Filme, setId_Filme] = useState('')
    const [dataLocacao, setDataLocacao] = useState("2022-07-01T20:52:43.107Z")
    const [dataDevolucao, setDataDevolucao] = useState("2022-07-01T20:52:43.107Z")
    const [titulo, setTitulo] = useState('')
    const [classificacaoIndicativa, setClassificacaoIndicativa] = useState('')
    const [lancamento, setLancamento] = useState('')

    const [cpf, setCpf] = useState()
    const [dados, setDados] = useState("")
    const [load, setLoad] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {

        api.get(`Filme/id/${id}`).then(response => {
            setId_Filme(response.data.id)
            setTitulo(response.data.titulo)
            setClassificacaoIndicativa(response.data.classificacaoIndicativa)
            setLancamento(response.data.lancamento)
        })
    }, [])


    function verificarCliente(e) {
        if (cpf == '') {
            alert('Informe seu CPF')
        }
        e.preventDefault()
        api.get(`Cliente/${cpf}`).then(response => {
            setDados(response.data)
            setId_Cliente(response.data.id)
            setLoad(true)
        }).catch(() => {
            alert('Cpf não encontrado. Verifique se seu cpf esta correto ou crie uma conta.')
        })
    }

    function alugarFilme(e) {
        if (dataLocacao == '') {
            return alert('Informe a data da locação')
        }

        if (dataDevolucao == '') {
            return alert('Informe a data de devoluçao')
        }
        e.preventDefault()

        const data = {
            id_Cliente,
            id_Filme,
            dataLocacao,
            dataDevolucao
        }
        console.log(id_Cliente)
        api.post("Locacao", data).then(() => {
            alert(`Filme ${titulo} alugado com sucesso`)
            navigate("/")
        }).catch((error) => {
            alert('Não foi possível alugar este filme. Tente novamente')
        })
    }

    return (
        <div>
            <Header img={Logo} text="Alugando um filme" content="Antes de alugar é necessário nos informa seu cpf " />

            <form className='container_detail_form' onSubmit={verificarCliente}>
                <div className='container_detail_inputs'>
                    <label className='text_addmovie_input_label'>Cpf</label>
                    <input type="text" className='input' value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </div>
                <input type="submit" value="Pesquisar" className='input_submit_newmovie' />
            </form>
            {load ? <div className='container_confirm_movie'>
                <p className='text_title_confirm_movie_title'>Olá, {dados.name}! Você está alugando o filme:</p>
                <div className='container_confirm_movie_box'>
                    <div className='container_confirm_box_left'>
                        <img src={Rools} className='img_rolls_movie_left' />
                    </div>
                    <div className='container_confirm_box_rigth'>
                        <div className='container_confirm_box_row'>
                            <AiOutlineVideoCamera />
                            <p className='text_confirm_box'>{titulo}</p>
                            <div />
                        </div>

                        <div className='container_confirm_box_row'>
                            <AiOutlineStop />
                            <p className='text_confirm_box'>{classificacaoIndicativa}</p>
                            <div />
                        </div>

                        <div className='container_confirm_box_row'>
                            <AiOutlineFire />
                            <p className='text_confirm_box'>{lancamento == 2 ? <p>Lançamento</p> : <p>Comum</p>}</p>
                            <div />
                        </div>
                    </div>
                </div>
            </div> : <p></p>}

            {load ? <form className='container_detail_form' onSubmit={alugarFilme}>
                <input type="submit" value="Alugar" className='input_submit_newmovie' />
            </form> : <p></p>}

        </div>
    )
}