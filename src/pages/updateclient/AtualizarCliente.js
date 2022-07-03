
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Logo from '../../assets/logo.png'
import Header from "../../components/Header";

import api from "../../services/api";

export default function UpdateCliente() {

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')


    const { id } = useParams()

    function buscarCliente() {
        api.get(`Cliente/id/${id}`).then(response => {
            setName(response.data.name)
            setCpf(response.data.cpf)
            setDataNascimento(response.data.dataNascimento)


        }).catch(() => {
            alert("Não foi possível localizar seus dados")
        })
    }
    function atualizar(e) {
        e.preventDefault()
        if (name == '') {
            return alert("Informe seu nome")
        }

        if (cpf == '') {
            return alert("Informe seu cpf")
        }

        if (dataNascimento == '') {
            return alert("Informe sua data de nascimento")
        }
        const data = {
            id,
            name,
            cpf,
            dataNascimento
        }

        api.put("Cliente", data).then(() => {
            alert("Cadastro atualizado com sucesso")
        }).catch(() => {
            alert("Não foi possível atualizar seu cadastro. Tente novamente.")
        })
    }

    useEffect(() => {
        buscarCliente()
    }, [])
    return (
        <div>
            <Header img={Logo} text="Atualizando dados do cliente" content="Faça alteração dos dados do cliente" />

            <form className='container_signup_form' onSubmit={atualizar}>
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


                <input type="submit" value="Atualizar" className='input_submit' />
            </form>
        </div>
    )
}