import { Link } from "react-router-dom"
import { STUDIO_NAME, WEBSITE_NAME } from "../BASE_URL"
import "./about.css"



export const About = () => {
    return (
        <>
        <div className="about_page">
        <div className="about_section">
            <div className="text_section">
              <h1>About {STUDIO_NAME}</h1>
            <p>{STUDIO_NAME} is a company dedicated to creating innovative and user-friendly software solutions that empower individuals and businesses alike. We aren't <i>just</i> another production company. We're a human-and-creativity-first production company.</p>  
            </div>
        </div>
        <div className="about_section">
            <div className="text_section">
              <h1>What We Do</h1>
            <p>We create many kinds of things, such as video games, websites, and even animations! If you want to learn more on what we are <i>currently</i> working on, be sure to check our <Link to={"/projects"} style={{color: "blue"}}>current projects</Link>. There, you'll see what we're cooking up.</p> 
            <div className="buttons">
                <Link to={"/projects"}>Our Projects</Link>
            </div> 
            </div>
        </div>
        </div>
        </>
    )
}