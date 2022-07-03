
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineCalendar, AiOutlineException } from "react-icons/ai";

import Header from "../../components/Header";
import Logo from '../../assets/logo.png'

import './client.css'
import api from "../../services/api";

export default function Clients() {

    const [clients, setClients] = useState([])

    useEffect(() => {

        api.get("Cliente").then(response => {
            setClients(response.data)

        }).catch((error) => {
            alert(`Não foi possível nossos clientes. Tente novamente `)
        })

    }, [])

    function removerCliente(id) {
        api.delete(`Cliente/${id}`).then(() => {
            alert("Cliente removido com suceso.")
            setClients(clients.filter(client => client.id !== id))
        }).catch((error) => {
            alert(`Não foi possível remover este cliente. Tente novamente `)
        })
    }

    return (
        <div>
            <Header img={Logo} text="Nossos clientes" content="Essa é a relação dos nossos clientes" />

            <div className="container_cliente_content">
                {clients.map(client => {
                    return (
                        <div className="container_client_box">
                            <div className="container_cliente_box_row">
                                <AiOutlineUser size={20} color="#000" />
                                <p className="text_client_box">{client?.name}</p>
                                <div />
                            </div>

                            <div className="container_cliente_box_row">
                                <AiOutlineCalendar size={20} color="#000" />
                                <p className="text_client_box">{client?.cpf}</p>
                                <div />
                            </div>

                            <div className="container_cliente_box_row">
                                <AiOutlineException size={20} color="#000" />
                                <p className="text_client_box">{Intl.DateTimeFormat('pt-BR').format(new Date(client?.dataNascimento.split("T", 10)[0]))}</p>
                                <div />
                            </div>
                            <div className="container_client_options">
                                <div className="container_client_remove">
                                    <button className="input_remove" onClick={() => removerCliente(client?.id)}>Remover</button>
                                </div>

                                <div className="container_client_update">
                                    {/* <input type="submit" value="Atualizar" className="input_update" /> */}
                                    <button className='input_update_roww'>
                                        <Link to={`/atualizar/${client?.id}`} className="text_input_row">Atualizar</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}