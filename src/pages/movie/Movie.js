import { useState } from "react";

import api from "../../services/api";

import Header from "../../components/Header";
import Rools from '../../assets/rolls.png'
import Logo from '../../assets/logo.png'

import { AiOutlineVideoCamera, AiOutlineStop, AiOutlineFire } from "react-icons/ai";
import './mov.css'

export default function Movie() {

    const [titulo, setTitulo] = useState(null)
    const [dados, setDados] = useState("")

    function buscarFilme(e) {

        if (titulo == '') {
            return alert('Informe o nome do filme')
        }
        e.preventDefault()

        api.get(`Filme/${titulo}`).then(response => {
            setDados(response.data)
        }).catch(() => {
            return alert(`Infelizmente não temos esse filme no nosso catálogo`)
        })
    }
    return (
        <div>
            <Header img={Logo} text="Qual fime você está procurando?" content="Nos diga qual o nome do filme que você está procurando" />

            <form className='container_detail_form' onSubmit={buscarFilme}>
                <div className='container_detail_inputs'>
                    <label className='text_addmovie_input_label'>Nome do filme</label>
                    <input type="text" className='input' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </div>

                <input type="submit" value="Pesquisar" className='input_submit_movie' />
            </form>

            <div className="container_movie_full">
                <div className="container_movie_box">
                    <div className="container_movie_box_left">
                        <img src={Rools} className="img_rolls_movie" />
                    </div>

                    <div className="container_movie_box_rigth">
                        <div className="container_movie_box_right_row">
                            <AiOutlineVideoCamera />
                            <p className="text_movie_box_rigth_data">{dados?.titulo}</p>
                            <div />
                        </div>

                        <div className="container_movie_box_right_row">
                            <AiOutlineStop />
                            <p className="text_movie_box_rigth_data">{dados?.classificacaoIndicativa}</p>
                            <div />
                        </div>

                        <div className="container_movie_box_right_row">
                            <AiOutlineFire />
                            <p className="text_movie_box_rigth_data">{dados?.lancamento == 2 ? <p>Lançamento</p> : <p>Comum</p>}</p>
                            <div />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}