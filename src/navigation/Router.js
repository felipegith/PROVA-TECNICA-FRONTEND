
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from '../pages/home/Home'
import Dash from "../pages/dashboard/Dash"
import Detail from "../pages/detail/Detail"
import Movies from "../pages/movies/Movies"
import Signup from "../pages/signup/Signup"
import Clients from "../pages/clients/Clients"
import Addmovie from "../pages/addmovie/Addmovie"
import UpdateCliente from "../pages/updateclient/AtualizarCliente"
import AtualizarFilme from "../updatemovie/AtualizarFilme"
import Movie from "../pages/movie/Movie"
import NewMovie from "../pages/newmovie/Newmovie"
import AtualizarLocacao from "../pages/atualizarlocacao/Atualizarlocacao"
/* import Removemovie from "../pages/removemovie/Removemovie" */


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro" element={<Signup />} />
                <Route path="/filmes" element={<Movies />} />
                <Route path="/novosfilmes" element={<Addmovie />} />
                <Route path="/detalhe" element={<Detail />} />
                {/* <Route path="/removerfilme/:id" element={<Removemovie />} /> */}
                <Route path="/clientes" element={<Clients />} />
                <Route path="/atualizar/:id" element={<UpdateCliente />} />
                <Route path="/filme" element={<Movie />} />
                <Route path="/painel" element={<Dash />} />
                <Route path="/alugar/:id" element={<NewMovie />} />
                <Route path="/atualizarfilme/:id" element={<AtualizarFilme />} />
                <Route path="/atualizarlocacao/:id" element={<AtualizarLocacao />} />
            </Routes>
        </BrowserRouter>
    )
}