import "./Nav.css";
import React from "react";
import NavItem from "./NavItem"

export default props => 
    <aside className="menu-area">
        <nav className="menu">
            <NavItem icon="home" text="Início" link="/"/>
            <NavItem icon="users" text="Usuários" link="/users"/>
        </nav>
    </aside>