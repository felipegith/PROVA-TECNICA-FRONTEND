
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from '../pages/home/Home'
import Dash from "../pages/dashboard/Dash"
import Movie from "../pages/movie/Movie"
import Detail from "../pages/detail/Detail"
import Movies from "../pages/movies/Movies"
import Signup from "../pages/signup/Signup"
import Signin from "../pages/signin/Signin"
import Clients from "../pages/clients/Clients"
import NewMovie from "../pages/newmovie/Newmovie"
import Addmovie from "../pages/addmovie/Addmovie"
import UpdateCliente from "../pages/updateclient/AtualizarCliente"
import AtualizarFilme from "../updatemovie/AtualizarFilme"
import AtualizarLocacao from "../pages/atualizarlocacao/Atualizarlocacao"


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme" element={<Movie />} />
                <Route path="/painel" element={<Dash />} />
                <Route path="/filmes" element={<Movies />} />
                <Route path="/detalhe" element={<Detail />} />
                <Route path="/cadastro" element={<Signup />} />
                <Route path="/entrar" element={<Signin />} />
                <Route path="/clientes" element={<Clients />} />
                <Route path="/alugar/:id" element={<NewMovie />} />
                <Route path="/novosfilmes" element={<Addmovie />} />
                <Route path="/atualizar/:id" element={<UpdateCliente />} />
                <Route path="/atualizarfilme/:id" element={<AtualizarFilme />} />
                <Route path="/atualizarlocacao/:id" element={<AtualizarLocacao />} />
            </Routes>
        </BrowserRouter>
    )
}