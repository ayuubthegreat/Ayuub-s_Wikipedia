import { Link } from "react-router-dom"
import { STUDIO_NAME, WEBSITE_NAME } from "../BASE_URL"
import "./home.css"
import { useEffect } from "react"

export const Home = () => {
    useEffect(() => {
        document.title = `Home---${WEBSITE_NAME}`
    }, []);
 return (
    
    <>
    
    <div className="parent_container">
        <div className="child_container">
            <h1>Welcome to {WEBSITE_NAME}!</h1>
            <p>The website dedicated to {STUDIO_NAME}.</p>
            <img className="section_image" src="https://1drv.ms/i/c/09e336c8c6cc3c06/IQTsCnLUO2aIQbYbitgvl6J1AbOoenhZ9RU566h2WtEcB_M?width=1920&height=1440" width="1080" height="720" />
            <div className="buttons">
                <Link to={"/about"}>About Us</Link>
                <Link to={"/projects"}>Our Projects</Link>
            </div>
        </div>
        <div className="child_container">
            <h1>Where all of our projects come to life.</h1>
            <p>Did you know that every project we undertake is crafted with passion and precision?</p>
            <div className="buttons">
                <Link to={"/projects"}>Our Projects</Link>
            </div>
        </div>
        <div className="child_container">
            <h1>Note: this website is <i>still in development.</i></h1>
            <p>Meaning: the {STUDIO_NAME} team is still working on it. It is not finished and 
                is still prone to bugs and glitches.</p>
            <div className="buttons">
                <Link to={"/notes"}>Notes</Link>
            </div>
        </div>
        <div className="child_container">
            <h1>So, <i>are you ready to enter a <Link to={"/hub"} title="Step into the world of Crescent Moon Studio!"><strong style={{color: "green"}}>whole new world</strong></Link> of content?</i></h1>
            <p>Alright. Let's dive in! </p>
            <Link className="shiny_button" to={"/hub"}>Bismillah!</Link>
        </div>
    </div>
    </>
 )
}
