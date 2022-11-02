import { HeaderContainer } from "./styles"

import logoImg from '../../assets/Logo.svg'
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
    return (

        <HeaderContainer>
            <img src={ logoImg } alt="" />
            <span>Developer with ♥ by: <a target="noblank" href="http://gilbertoaleite-desenvolvedor.tech/">Gilberto A Leite</a></span>
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={ 24 } />
                </NavLink>

                <NavLink to="/history" title="Histórico">
                    <Scroll size={ 24 } />
                </NavLink>
                </nav>
        </HeaderContainer>
    );
}