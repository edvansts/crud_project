import React from "react"
import "./NavItem.css"
import { Link } from "react-router-dom"

export default props => 
    <Link to={props.link}>
        <i className={`fa fa-${props.icon}`}></i> {props.text}
    </Link>