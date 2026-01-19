import { Link } from "react-router-dom"
import { WEBSITE_NAME } from "../BASE_URL"
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
            <p>The free Wikipedia alternative for everything made under Crescent Moon Studios.</p>
            <div className="buttons">
                <Link to={"/about"}>About Us</Link>
                <Link to={"/projects"}>Our Projects</Link>
                <Link to={"/GITS"}>Glitch In The System</Link>
            </div>
        </div>
        <div className="child_container">
            <h1>Think of it as a personalized, custom <a target="_blank" rel="noopener noreferrer" title="Yes, this word is clickable. Click on it!" href="https://www.fandom.com"><i style={{color: "red"}}>Fandom</i></a> wiki.</h1>
            <p>A place where the insight, development, and descriptions of our projects are located.</p>
            <div className="buttons">
                <Link to={"/projects"}>Our Projects</Link>
            </div>
        </div>
        <div className="child_container">
            <h1>Note: this website is <i>still in development.</i></h1>
            <p>Meaning: the Crescent Moon Studio team is still working on it. It is not finished and 
                is still prone to bugs and glitches.</p>
            <div className="buttons">
                <Link to={"/progress"}>Progress In Development</Link>
            </div>
        </div>
        <div className="child_container">
            <h1><i>Also,</i> this website's content will mostly remain neutral. No biased content will be featured here, EXCEPT in the "<i style={{color: "gray"}}>Author's Note</i>" section.</h1>
            <p>Look out for any "<i style={{color: "gray"}}>Author's Note</i>" section for any biased information.</p>
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
