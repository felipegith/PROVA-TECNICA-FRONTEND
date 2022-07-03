
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Logo from '../assets/logo.png'
import Header from "../components/Header"
import api from '../services/api'

export default function AtualizarFilme() {
    const [titulo, setTitulo] = useState('')
    const [classificacaoIndicativa, setClassificacaoIndicativa] = useState('')
    const [lancamento, setLancamento] = useState('')

    const { id } = useParams()

    function buscarFilme() {
        api.get(`Filme/id/${id}`).then(response => {
            setTitulo(response.data.titulo)
            setClassificacaoIndicativa(response.data.classificacaoIndicativa)
            setLancamento(response.data.lancamento)
        }).catch(() => {
            alert("Não foi possível encontrar o filme. Tente novamente.")
        })
    }
    function atualizafilme(e) {
        e.preventDefault()
        if (titulo == '') {
            return alert("Informe o nome do filme")
        }

        if (classificacaoIndicativa == '') {
            return alert("Informe a classificação do filme")
        }

        if (lancamento == '') {
            return alert("Informe se o filme é lançamento ou comum")
        }
        const data = {
            id,
            titulo,
            classificacaoIndicativa,
            lancamento
        }
        api.put("Filme", data).then(() => {
            alert("Filme atualizado com sucesso.")
        }).catch(() => {
            alert("Não foi possível atualizar este filme. Tente novamente.")
        })
    }
    useEffect(() => {
        buscarFilme()
    }, [])
    return (
        <div>
            <Header img={Logo} text="Atualizando dados do filme" content="Faça alteração das informações sobre o filme" />

            <form className='container_signup_form' onSubmit={atualizafilme}>
                <div className='container_signup_inputs'>
                    <label className='text_signup_input_label'>Título</label>
                    <input type="text" className='input' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </div>

                <div className='container_signup_inputs'>
                    <label className='text_signup_input_label'>Classificação</label>
                    <input type="text" className='input' value={classificacaoIndicativa} onChange={(e) => setClassificacaoIndicativa(e.target.value)} />
                </div>

                <div className='container_signup_inputs'>
                    <label className='text_signup_input_label'>Lançamento</label>
                    <select
                        value={lancamento} onChange={e => setLancamento(e.target.value)}
                        className="input" >
                        <option value="1"></option>
                        <option value="2">Lançamento</option>
                        <option value="3">Não lançamento</option>
                    </select >
                </div>


                <input type="submit" value="Atualizar" className='input_submit' />
            </form>
        </div>
    )
}