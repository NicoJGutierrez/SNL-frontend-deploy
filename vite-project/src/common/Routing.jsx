import { BrowserRouter, Routes, Route } from "react-router-dom"
import Instructions from "../game-instructions/instructions"
import OpcionesJugar from "../game-instructions/OpcionesJugar"
import Game from "../game-page/game.jsx"
import App from "./App"
import LandingPage from "./LandingPage/LandingPage"
import Login from '../profile/Login.jsx'
import CharSelect from "../game-page/CharSelect"
import UserCheck from '../protected/UserCheck'
import AdminCheck from "../protected/AdminCheck.jsx"
import Inicio from "../game-page/inicio.jsx"
import Ranklist from "../game-instructions/RankingJugadores.jsx"
import DeployPartidas from "../game-page/deploy-partidas.jsx"
import DeployCarta from "../admin/cards.jsx"
import DeployUsuario from "../admin/users.jsx"
import SearchUsuario from "../admin/search-user.jsx"
import SearchCarta from "../admin/search-card.jsx"
import DeployUsuarios from "../admin/deploy-users.jsx"
import EditUsuario from "../admin/edit-user.jsx"
import CreateCard from "../admin/create-card.jsx"
import DeployCards from "../admin/deploy-cards.jsx"
import EditCard from "../admin/edit-card.jsx"


function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/instructions'} element={<Instructions/>}/>
                <Route path={'/OpcionesJugar'} element={<OpcionesJugar/>}/>
                <Route path={'/LandingPage'} element={<LandingPage/>}/>
                <Route path={'/game/:id_partida'} element={<Game/>}/>
                <Route path={'/'} element={<App/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/charselect/:id_partida'} element={<CharSelect/>}/>
                <Route path={'/usercheck'} element={<UserCheck/>}/>
                <Route path={'/admincheck'} element={<AdminCheck/>}/>
                <Route path={'/inicio'} element={<Inicio/>}/>
                <Route path={'/ranking'} element={<Ranklist/>}/>
                <Route path={'/games'} element={<DeployPartidas/>}/>
                <Route path={'/adminCards/:id_carta'} element={<DeployCarta/>}/>
                <Route path={'/adminUser/:id_usuario'} element={<DeployUsuario/>}/>
                <Route path={'/searchUser'} element={<SearchUsuario/>}/>
                <Route path={'/searchCard'} element={<SearchCarta/>}/>
                <Route path={'/users'} element={<DeployUsuarios/>}/>
                <Route path={'/editUser/:id_usuario'} element={<EditUsuario/>}/>
                <Route path={'/editCard/:id_carta'} element={<EditCard/>}/>
                <Route path={'/createCard'} element={<CreateCard/>}/>
                <Route path={'/cards'} element={<DeployCards/>}/>
             </Routes>
        </BrowserRouter>

        </>
    )
}

export default Routing