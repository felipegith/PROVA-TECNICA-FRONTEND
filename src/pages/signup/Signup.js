
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import './signup.css'
import Logo from '../../assets/logo.png'
import Header from '../../components/Header'

import api from '../../services/api'


export default function Signup() {

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')

    const navigate = useNavigate()
    function cadastro(e) {
        if (name == '') {
            return alert('Informe seu nome')
        }

        if (cpf == '') {
            return alert('Informe seu cpf')
        }

        if (dataNascimento == '') {
            return alert('Informe sua data de nascimento')
        }
        e.preventDefault()

        const data = {
            name,
            cpf,
            dataNascimento
        }

        api.post(`Cliente`, data).then(() => {
            alert(`Parabens ${name}, seu cadastro foi realizado com sucesso`)
            localStorage.setItem("NOME", name)
            navigate("/")
        }).catch(() => {
            alert('Não foi possível realizar seu cadastro. Tente novamente')
        })
    }
    return (
        <div id="container_signup">
            <Header img={Logo} text="Você é novo por aqui?!" content="Faça seu cadastro e alugue os filmes que você tanto gosta" />
            <form className='container_signup_form' onSubmit={cadastro}>
                <div className='container_signup_inputs'>
                    <label className='text_signup_input_label'>Nome Completo</label>
                    <input type="text" className='input' value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='container_signup_inputs'>
                    <label className='text_signup_input_label'>Cpf</label>
                    <input type="text" className='input' value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </div>

                <div className='container_signup_inputs'>
                    <label className='text_signup_input_label'>Data de nascimento</label>
                    <input type="date" className='input' value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </div>


                <input type="submit" value="Cadastrar" className='input_submit' />
            </form>
        </div>
    )
}