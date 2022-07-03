
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../assets/logo.png'
import HeaderRigth from '../../assets/headerfilme.jpg'

import './home.css'
export default function Home() {
    const [logado, setLogado] = useState(false)

    const usuario = localStorage.getItem("NOME")
    function deslogar() {
        localStorage.clear();
        setLogado(!logado)
    }

    useEffect(() => { }, [usuario])
    return (
        <div id="container_home">
            <header className='container_home_header'>
                <div className='container_home_header_logo'>
                    <img src={Logo} className='logo_home_header' />
                    <span className='text_home_header_logo'>e-auditoria Locações</span>
                </div>
                <div className='container_home_header_options'>
                    <Link to="/entrar" className='text_home_header_options'>Entrar</Link>
                    <Link to="/novosfilmes" className='text_home_header_options'>Cadastrar Filmes</Link >
                    <Link to="/clientes" className='text_home_header_options'>Nossos clientes</Link >
                    <Link to="/painel" className='text_home_header_options'>Relatórios</Link>

                </div>
                {usuario == null ? <div className='container_home_header_button'>
                    <Link to="/cadastro" className='text_home_header_button'>Cadastre-se</Link >
                </div> : <details>
                    <summary className='text_signin_home'>Olá {usuario}</summary>
                    <ul>
                        <li><Link to="/detalhe" className='text_home_detail'>Meus filmes</Link></li>
                        <li><p onClick={deslogar} className='text_home_detail_link_logout'>Deslogar</p></li>
                    </ul>

                </details>}


            </header>
            <main className='container_home_main'>
                <div className='container_home_main_left'>
                    <div className='container_home_main_left_content'>
                        <div className='teste'>
                            <h1 className='text_home_main_left_content'>e-auditoria</h1>
                            <h1 className='text_home_main_left_content'>Filmes &</h1>
                            <h1 className='text_home_main_left_content'>Locações</h1>
                            <div className='container_home_main_left_content_read'>
                                <span className='text_home_main_left_content_read'>Seja bem vindo a mais nova locadora do Brasil. Aqui você pode encontrar os melhores diversos filmes para a diversão da família e dos amigos. Veja agora nosso catálogo </span>
                            </div>
                            <div className='container_home_main_left_button'>
                                <Link to="/filmes" className='text_link'>Catálogo</Link>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='container_home_main_right'>
                    <img src={HeaderRigth} className='image_home_main_right' />
                </div>
            </main>
        </div>
    )
}