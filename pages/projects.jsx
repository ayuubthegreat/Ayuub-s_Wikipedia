import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import "./projects.css"
import { deleteProject, editObjective, fetchAllProjects } from "../store/slices/projects";
import { useEffect, useState } from "react";
import {ProjectWindow} from "../components/project_window.jsx"
import { CheckSquare2Icon, Pencil, Square } from "lucide-react";
import { DAYS_UNTIL_RELEASE_CRITICAL, DAYS_UNTIL_RELEASE_WARNING, STUDIO_NAME, WEBSITE_NAME } from "../BASE_URL.js";
import { Loading_Prop } from "../components/navbar.jsx";

const calculateDaysUntilRelease = (releaseDate) => {
    const currentDate = new Date();
    const targetDate = new Date(releaseDate);
    const timeDifference = targetDate - currentDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference > 0 ? daysDifference : 0;
}
const calculateColorToUse = (daysUntilRelease) => {
    if (daysUntilRelease <= DAYS_UNTIL_RELEASE_WARNING) {
        return daysUntilRelease <= DAYS_UNTIL_RELEASE_CRITICAL? "red" : "yellow";
    } else {
        return "darkgreen";
    }
}
const calculatePercentageUntilCompleted = (objectives) => {
    if (!objectives || objectives.length === 0) return 0;
    const completedObjectives = objectives.filter(obj => obj.completed).length;
    return Math.round((completedObjectives / objectives.length) * 100);
}
export const Projects = () => {
    const d = useDispatch();
    const [showProjectWindow, setShowProjectWindow] = useState(false);
    const [index, setIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const {loading, projects} = useSelector(state => state.projects);
    const {user} = useSelector(state => state.auth);
    useEffect(() => {
            document.title = `Projects---${WEBSITE_NAME}`
        }, []);
    useEffect(() => {
        const fetchProjects = async () => {
           try {
                await d(fetchAllProjects()).unwrap();
                console.log("Projects fetched successfully. Projects:", projects);
           } catch (error) {
                console.error("Failed to fetch projects:", error);
           }
        }
        if (user) {
            fetchProjects();
        }
    }, [user])
    const openProjectWindow = (editing = false, projectIndex = -1) => {
        setIsEditing(editing);
        setIndex(projectIndex);
        setShowProjectWindow(true);
        console.log(showProjectWindow, isEditing, index);
    }
    const promptMessage = (user && user.role === "supa_admin" ? `Hello, ${user.name}. There are no projects to display at the moment. Would you like to create one?` : "There are no projects to display at the moment. Please check back later or contact the administrator for more information.");
    return (
        <>
        {loading && <Loading_Prop></Loading_Prop>}
        {showProjectWindow && <ProjectWindow isEditing={isEditing} closeWindow={() => setShowProjectWindow(false)} selectedIndex={index}></ProjectWindow>}
        <div className="projects">
            <div className="projects_subsection title" style={{backgroundColor: "wheat"}}>
             <h1>Our Projects here at {STUDIO_NAME}</h1>
            <p>These are the projects that we have on the production line. Check back frequently for updates!</p> 
            <p>We currently have <strong>{projects.length}</strong> project{projects.length !== 1 && "s"} in progress.</p>  
            </div>
            <div className="projects_subsection friendly-note" style={{backgroundColor: `${user && user.role && user.role === "supa_admin" ? "green": "lightred"}`}}>
              <p>Friendly reminder: Our systems have determined that {(user && user.role && user.role === "supa_admin") ? " you are an admin. You can create and manage projects." : " you are not an admin. You can view projects but cannot create or manage them."}</p> 
            </div>
            {projects && projects.length > 0 ? (
                <>
                {user.role && user.role === "supa_admin" && <button onClick={() => {openProjectWindow()}} className="creation_button">Create Project</button>}
                {projects.map((project) => {
                    const objectives = [...(project.objectives || [])];
                    return (
                        <>
                        <div key={project.id} className="project-card">
                        {user.role && user.role === "supa_admin" && (
                            <>
                            <div>
                            <button onClick={() => openProjectWindow(true, projects.indexOf(project))}>Edit Project</button>
                            <button onClick={() => {
                                const deleteProject_func = async () => {
                                    try {
                                     await d(deleteProject({projectID: project.id})).unwrap();
                                     await d(fetchAllProjects()).unwrap();
                                     console.log("Project deleted successfully.");
                                    } catch (error) {
                                     console.error("Failed to delete project:", error);
                                    }
                                }
                                deleteProject_func();
                            }}>Delete Project</button>
                        </div>
                            </>
                        )}
                        <div className="project-details">
                          <h2 className="project-title">{project.title}</h2>
                        <p>{project.description}</p>
                        <p>{project.content}</p>
                        <div className="window project-release-date">
                            <strong style={{color: calculateColorToUse(calculateDaysUntilRelease(project.release_date))}} className="percentage">{calculateDaysUntilRelease(project.release_date)}</strong>
                            <p><i>Day{calculateDaysUntilRelease(project.release_date) !== 1 && "s"} until release</i></p>
                        </div>
                        <div className="">
                            <h2>Tags</h2>
                          {(project.tags && project.tags.length > 0) &&<p>{project.tags.split(",").map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}</p>}  
                        </div>
                        
                        <div className="window">
                            {project.objectives && project.objectives.length > 0 ? (
                                <>
                                <p className="objectives-title">Objectives for {project.title}</p>
                                {objectives.sort((a, b) => a.step - b.step).map((objective, idx) => {
                                    return (
                                        <div key={idx} className="objective-item">
                                        <button><Pencil></Pencil></button>
                                        <p>Step {objective.step}</p>
                                        <h3>{objective.title}</h3>
                                        <p>{objective.description}</p>
                                        <p className="clickable" onClick={() => {
                                            const changeObjectiveCompletion = async() => {
                                                if (user.role !== "supa_admin") {
                                                    console.log("Only admins can change objective completion status.");
                                                    return;
                                                }
                                                console.log("Toggling completion status for objective:", objective.id);
                                                try {
                                                    await d(editObjective({objectiveID: objective.id, title: objective.title, description: objective.description, completed: !objective.completed, projectID: project.id})).unwrap();
                                                    await d(fetchAllProjects()).unwrap();
                                                    console.log("Objective completion status toggled.");
                                                } catch (error) {
                                                    console.error("Failed to toggle objective completion status:", error);
                                                }
                                            }
                                            changeObjectiveCompletion();
                                        }}>{objective.completed === true ? <CheckSquare2Icon></CheckSquare2Icon> : <Square></Square>}</p>
                                        </div>
                                    )
                                })}
                                </>
                            ): (<>
                            <p>No objectives defined.</p>
                            </>)}
                        </div>
                        
                        
                        <div className="window project-progress">
                            <div className="progress-bar">
                            <div className="progress-fill" style={{width: `${calculatePercentageUntilCompleted(project.objectives)}%`}}></div>
                        </div>
                            <strong className="percentage">{calculatePercentageUntilCompleted(project.objectives)}%</strong>
                            <p>Completed</p>
                        </div>
                    </div>
                        </div>
                        </>
                    )}
           )}
                </>
                
            ) : (
                <>
                <p>{promptMessage}</p>
                {user && user.role === "supa_admin" && (
                   <button onClick={() => {openProjectWindow()}} className="creation_button">Create Project</button>
                )}
                </>
            )}
        </div>
        </>
    )
}