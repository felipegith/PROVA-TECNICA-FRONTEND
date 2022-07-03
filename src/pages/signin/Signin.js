
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './signin.css'
import Logo from '../../assets/logo.png'
import Header from '../../components/Header'
import api from '../../services/api'

export default function Signin() {
    const [cpf, setCpf] = useState("")

    const navigate = useNavigate()

    function entrar(e) {
        e.preventDefault()

        api.get(`Cliente/Entrar/${cpf}`).then(response => {
            console.log(response.data)
            localStorage.setItem("NOME", response.data.name)
            navigate("/")
        }).catch(() => {
            alert("Não foi possível encontrar esse CPF. Verifique se você digitou corretamente ou crie uma conta")
        })
    }
    return (
        <div>
            <Header img={Logo} text="Seja bem vindo de volta!" content="Informe seu CPF para fazer login" />

            <form className='container_detail_form' onSubmit={entrar}>
                <div className='container_detail_inputs'>
                    <label className='text_addmovie_input_label'>Cpf</label>
                    <input type="text" className='input' value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </div>

                <input type="submit" value="Entrar" className='input_submit_signin' />
            </form>
        </div>
    )
}