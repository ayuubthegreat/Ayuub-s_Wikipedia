import { X } from "lucide-react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import "./project_window.css"
import { zodResolver } from "@hookform/resolvers/zod";
import { objectiveSchema, projectSchema } from "../schema/schemas";
import { useState } from "react";
import { addProject, fetchAllProjects, updateProject } from "../store/slices/projects";
import { set } from "zod";


const ObjectiveWindow = ({closeWindow, getValuesParent, setValueParent, setTempObjectives}) => {
    
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm({
        resolver: zodResolver(objectiveSchema),
        defaultValues: {
            title: "",
            description: "",
            step: getValuesParent("objectives") ? getValuesParent("objectives").length + 1 : 1,
        }
    })
    const handleAddObjective = () => {
        const currentObjectives = getValuesParent("objectives") || [];
        const newObjective = {
            title: getValues("title"),
            description: getValues("description"),
            step: currentObjectives.length + 1,
        };
        const updatedObjectives = [...currentObjectives, newObjective];
        setValueParent("objectives", updatedObjectives);
        setTempObjectives(updatedObjectives);
        console.log("Adding objective:", newObjective , "Updated objectives:", updatedObjectives, "Original objectives value: ", getValuesParent("objectives"));
        closeWindow();
    };
    
    return (
        <>
        <div style={{zIndex: 1200}} className="window_backdrop">
        <div style={{zIndex: 1200}} className="window_header">
            <button onClick={closeWindow}><X></X></button>
            <h1>Add New Objective</h1>
            <p>Define the objectives for this project below.</p>
            <form onSubmit={handleSubmit(handleAddObjective)}>
             <div className="input_group">
                <input type="text" id="objective_window" placeholder="Objective Title" {...register("title")}/>
            </div>
            <div className="input_group">
                <input type="text" id="objective_window" placeholder="Objective Description" {...register("description")} />
            </div>
            <div className="input_group">
                <input type="number" id="objective_window" placeholder="Objective Step" {...register("step")} />
            </div>
            <div>
                <button type="submit" className="submission_button">Add Objective</button>
            </div>   
            </form>
            
        </div>
        </div>
        </>
    )
}
export const ProjectWindow = ({isEditing, closeWindow, selectedIndex}) => {
    const {projects} = useSelector(state => state.projects);
    const [showObjectiveWindow, setShowObjectiveWindow] = useState(false);
    const [tempObjectives, setTempObjectives] = useState([isEditing && [...projects[selectedIndex].objectives].sort((a, b) => a.step - b.step)]);
    const currentDate = new Date();
    const dispatch = useDispatch();
    console.log(currentDate.getTime(), "Current date time in ms. Here is the temporary objectives state:", tempObjectives);
    const defaultValues = isEditing ? {
        title: projects[selectedIndex].title,
        description: projects[selectedIndex].description,
        tags: projects[selectedIndex].tags,
        objectives: projects[selectedIndex].objectives,
        release_date: projects[selectedIndex].release_date,
        content: projects[selectedIndex].content,
    } : {
        title: "",
        description: "",
        objectives: [],
        tags: "",
        release_date: new Date().toDateString(),
        content: "",
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        getValues,
    } = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues,
    });
    const onSubmit_Parent = async (data) => {
        try {
            // Ensure objectives is always an array
            const finalData = {
                ...data,
            };
            console.log("Project data submitted:", finalData);
            if (data.release_date) {
                const releaseDate = new Date(data.release_date).getTime();
                console.log(finalData, releaseDate, currentDate.getTime());
                if (releaseDate < currentDate) {
                    alert("Release date cannot be in the past.");
                    return;
                }
            }
            await (isEditing ? dispatch(updateProject({id: projects[selectedIndex].id, ...finalData})).unwrap() : dispatch(addProject(finalData)).unwrap());
            dispatch(fetchAllProjects()).unwrap();
            console.log("Project successfully " + (isEditing ? "updated." : "created."));
            closeWindow();

            
        } catch (error) {
            console.error("Project submission failed:", error);
        }
    }
    
    return (
        <>
        {showObjectiveWindow && <ObjectiveWindow closeWindow={() => setShowObjectiveWindow(false)} setTempObjectives={setTempObjectives} getValuesParent={getValues} setValueParent={setValue}></ObjectiveWindow>}
        <div className="window_backdrop">
            <div className="window_header">
            <button onClick={closeWindow}><X></X></button>
            <h1>{isEditing ? "Editing Project" : "Create new project"}</h1>
            <p>{isEditing ? "Edit project details here." : "Create a new project by filling out the form below."}</p>
            <form onSubmit={handleSubmit(onSubmit_Parent)}>
                {/* Title */}
                <div className="input_group">
                    <input type="text" id="title" placeholder="Project Title" {...register("title")} />
                    {errors.title && <p className="error_message">{errors.title.message}</p>}
                </div>
                {/* Description */}
                <div className="input_group">
                    <input type="text" id="title" placeholder="Project Description" {...register("description")} />
                    {errors.description && <p className="error_message">{errors.description.message}</p>}
                </div>
                {/* Tags */}
                <div className="input_group">
                    <input type="text" id="title" placeholder="Project Tags (comma separated)" {...register("tags")} />
                    {errors.tags && <p className="error_message">{errors.tags.message}</p>}
                </div>
                {/* Objectives */}
                {!isEditing && <div className="input_group">
                    <div className="window">
                    {tempObjectives && tempObjectives.length > 0 ? (
                        <ul>
                        {tempObjectives.map((objective, index) => (
                            <>
                            <button type="button" onClick={() => {
                                let objectives_temp = [...tempObjectives].filter((val, i) => i != index);
                                console.log("Removing objective at index:", index, "New objectives list:", objectives_temp);
                                setTempObjectives(objectives_temp);
                                setValue("objectives", objectives_temp);
                            }}><X></X></button>
                            <p>{index + 1}</p>
                            <li key={index + "_title"}>{objective.title}</li>
                            <li style={{fontSize: 15, color: "greenyellow"}} key={index + "_description"}>{objective.description}</li>
                            </>
                        ))}
                        </ul>
                    ) : (<>
                    <p>Add An Objective</p>
                    </>)}
                    
                    <button type="button" onClick={() => {setShowObjectiveWindow(true)}}>Add Objective</button>
                    </div>
                    {errors.objectives && <p className="error_message">{errors.objectives.message}</p>}
                </div>}
                
                {/* Release Date */}
                <div className="input_group">
                    <input type="date" id="title" placeholder="Project Release Date" {...register("release_date")} />
                    {errors.release_date && <p className="error_message">{errors.release_date.message}</p>}
                </div>
                {/* Content */}
                <div className="input_group">
                    <textarea id="content" placeholder="Project Content" {...register("content")}></textarea>
                    {errors.content && <p className="error_message">{errors.content.message}</p>}
                </div>
                <button type="submit" className="submission_button">{isEditing ? "Save Changes" : "Create Project"}</button>
            </form>
            </div>
        </div>
        </>
    )
}
