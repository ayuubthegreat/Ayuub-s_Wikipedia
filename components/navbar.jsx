import { Link, useNavigate } from "react-router-dom"
import { WEBSITE_NAME } from "../BASE_URL"
import "./navbar.css"

export const Logo = () => {
    const n = useNavigate();
    return (
        <>
        <div className="logo_navbar" onClick={() => {n("/")}}>
            <h1>{WEBSITE_NAME}</h1>
            <p>Encyclopedia for everything Crescent Moon Studio</p>  
        </div>
        </>
    )
}
export const Navbar = () => {
    return (
        <>
        <nav className="header">
        <div>
            <Logo></Logo>
        </div>
        <div className="buttons">
           <Link to="/portal">Sign In</Link>
           <Link>Our Projects</Link>
        </div>
        </nav>
        </>
    )
    
}