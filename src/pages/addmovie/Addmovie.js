import { useState } from 'react'

import api from '../../services/api'

import Logo from '../../assets/logo.png'
import Header from '../../components/Header'

import './addmovie.css'
export default function Addmovie() {

    const [titulo, setTitulo] = useState('')
    const [classificacaoIndicativa, setClassificacaoIndicativa] = useState('')
    const [lancamento, setLancamento] = useState('')


    function cadastrarFilmes(e) {
        e.preventDefault()

        if (titulo == '') {
            return alert('Informe o nome do filme')
        }
        if (classificacaoIndicativa == '') {
            return alert('Informe uma classificação')
        }
        if (lancamento == '') {
            return alert('Informe se o filme é lançamento ou comum')
        }
        const data = {
            titulo,
            classificacaoIndicativa,
            lancamento
        }

        api.post("Filme", data).then(() => {
            alert("Filme cadastrado com sucesso!")

        }).catch((error) => {
            alert(`Não foi possível cadastrar o filme. Tente novamente `)
        })
    }
    return (
        <div id="container_addmovie">
            <Header img={Logo} text="Tem novos filmes chegando..." content="Cadastre os filmes no nosso catálogo" />

            <form className='container_addmovie_form' onSubmit={cadastrarFilmes}>
                <div className='container_addmovie_inputs'>
                    <label className='text_addmovie_input_label'>Título</label>
                    <input type="text" className='input' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </div>

                <div className='container_addmovie_inputs'>
                    <label className='text_addmovie_input_label'>Classificação</label>
                    <input type="number" className='input' value={classificacaoIndicativa} onChange={(e) => setClassificacaoIndicativa(e.target.value)} />
                </div>

                <div className='container_addmovie_inputs'>
                    <label className='text_addmovie_input_label'>Lançamento</label>
                    <select
                        value={lancamento} onChange={e => setLancamento(e.target.value)}
                        className="input" >
                        <option value="1"></option>
                        <option value="2">Lançamento</option>
                        <option value="3">Comum</option>
                    </select >
                </div>

                <input type="submit" value="Cadastrar" className='input_submit_addmovie' />
            </form>
        </div>
    )
}