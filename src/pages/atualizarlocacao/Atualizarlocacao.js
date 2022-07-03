

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import Header from '../../components/Header'
import api from '../../services/api'

export default function AtualizarLocacao() {
    const [dataDevolucao, setDataDevolucao] = useState("")
    const [dataLocacao, setDataLocacao] = useState("")
    const [id_Cliente, setId_Cliente] = useState("")
    const [id_Filme, setId_Filme] = useState("")
    const { id } = useParams()

    useEffect(() => {
        api.get(`Locacao/${id}`).then(response => {
            setDataDevolucao(response.data.dataDevolucao)
            setDataLocacao(response.data.dataLocacao)
            setId_Cliente(response.data.id_Cliente)
            setId_Filme(response.data.id_Filme)
            console.log(response.data)
        })
    }, [])

    function atualizardevolucao(e) {
        e.preventDefault()
        const data = {
            id_Filme,
            id_Cliente,
            id,
            dataLocacao,
            dataDevolucao
        }
        api.put("Locacao", data).then(() => {
            alert("Dados da locação atualizados com sucesso")
        }).catch(() => {
            alert("Não foi possível atualizar os dados da locação")
        })
    }


    return (
        <div>
            <Header img={Logo} text="Atualizando dados da locação" content="Atualize a data da locação e devolução " />

            <form className='container_addmovie_form' onSubmit={atualizardevolucao}>
                <div className='container_addmovie_inputs'>
                    <label className='text_addmovie_input_label'>Data da loçação</label>
                    <input type="date" className='input' value={dataLocacao} onChange={(e) => setDataLocacao(e.target.value)} />
                </div>

                <div className='container_addmovie_inputs'>
                    <label className='text_addmovie_input_label'>Data da devolução</label>
                    <input type="date" className='input' value={dataDevolucao} onChange={(e) => setDataDevolucao(e.target.value)} />
                </div>
                <input type="submit" value="Atualizar" className='input_submit_addmovie' />
            </form>
        </div>
    )
}