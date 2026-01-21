import { Link, useNavigate } from "react-router-dom"
import { STUDIO_NAME, WEBSITE_NAME } from "../BASE_URL"
import "./navbar.css"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout_reducer } from "../store/slices/auth";
import { Loader, Loader2Icon } from "lucide-react";


export const Logo = () => {
    const n = useNavigate();
    return (
        <>
        <div className="logo_navbar" onClick={() => {n("/")}}>
            <h1>{WEBSITE_NAME}</h1>
            <p>Website for everything {STUDIO_NAME}</p>  
        </div>
        </>
    )
}
export const Navbar = () => {
    
    const {user, token} = useSelector(state => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const n = useNavigate();
    const buttons = () => {
        if (token && user) {
            return (<>
            <p className="user_greeting">Hello, <i className="user-name">{user.name}</i> !</p>
            <Link to="/about">About Us</Link>
            <Link to="/gitspedia">Gits-pedia</Link>
            <Link to="/projects">Our Projects</Link>
            <a className="transparent_button" onClick={() => {
                const logout_button = async() => {
                    try {
                        dispatch(logout_reducer());
                        console.log("Logged out successfully.");
                        n("/portal");
                    } catch (error) {
                        console.error("Logout failed:", error);
                    }
                }
                logout_button();
            }}>Logout</a>
            </>)
        } else {
            return (
                <>
                <Link to="/about">About Us</Link>
                <Link to="/gitspedia">Gits-pedia</Link>
                <Link to="/projects">Our Projects</Link>
                <Link to="/portal">Sign In</Link>
                <Link to="/register" style={{color: "white"}} className="shiny_button">Register</Link>
                </>
            )
        }
    }
    return (
        <>
        <nav className="header">
        <div>
            <Logo></Logo>
        </div>
        <div className="buttons nav_buttons">
            {buttons()}
        </div>
        <div className="dropdown">
            <button id="dropbtn" className={`dropbtn transparent_button ${isOpen ? "reveal" : "unreveal"}`} onClick={() => {
                const dropdown = document.getElementById("dropdown_content");
                dropdown.classList.toggle("hidden");
                setIsOpen(!isOpen);
            }}>☰</button>
            <div id="dropdown_content" className="hidden">
                <div className="buttons dropdown">
                  {buttons()}   
                </div>  
            </div>
        </div>
        </nav>
        </>
    )
    
}
export const Loading_Prop = () => {
    const {loading} = useSelector(state => state.auth);
    const {loading: projectsLoading} = useSelector(state => state.projects); 
    if (!loading && !projectsLoading) {
        return null;
    }
    return (
        <>
        <div className="window_backdrop" >
        <div className="window_header">
        <div className="loading">
        <Loader></Loader>
        </div>
        <p>Loading.....Please wait...</p>
        </div>
        </div>
        </>
    
    )
}