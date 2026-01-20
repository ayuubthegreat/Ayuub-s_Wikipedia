import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, registerSchema } from "../schema/schemas";
import { login, registerThunk } from "../store/slices/auth";
import { WEBSITE_NAME } from "../BASE_URL";
import "./login.css"
import { LockIcon, MailIcon } from "lucide-react";
import { useEffect } from "react";


export const Login = ({loginBool = true}) => { // login = true for login page, false for register page
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
            document.title = `Login---${WEBSITE_NAME}`
        }, []);
    const defaultValues = loginBool ? {
        email: "",
        password: ""
    } : {
        name: "",
        email: "",
        password: ""
    }
    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm({
        resolver: zodResolver(loginBool ? loginSchema : registerSchema),
        defaultValues: defaultValues,
    })
    const onSubmit = async (data) => {
        try {
            if (loginBool) {
               await dispatch(login(data)).unwrap(); 
            } else {
                await dispatch(registerThunk(data)).unwrap();
            }
            
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    }
    return (
        <>
        <div className="login window">
            <h1>{loginBool ? "Sign In" : "Register"}</h1>
            <p>{loginBool ? `Sign in to your account. Here on ${WEBSITE_NAME}, everyone is welcome!` : `Register for an account. Here on ${WEBSITE_NAME}, everyone is welcome!`}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input_group">
                    {!loginBool && (<>
                        <LockIcon className="icon"></LockIcon>
                        <input type="text" id="name" placeholder="Enter name here" {...register("name")} />
                        {errors.name && <p className="error_message">{errors.name.message}</p>}
                    </>)}
                </div>
                <div className="input_group">
                    <MailIcon className="icon"></MailIcon>
                    <input type="email" id="email" placeholder="Enter email here" {...register("email")} />
                    {errors.email && <p className="error_message">{errors.email.message}</p>}
                </div>
                <div className="input_group">
                    <LockIcon className="icon"></LockIcon>
                    <input type="password" id="password" placeholder="Enter password here" {...register("password")} />
                    {errors.password && <p className="error_message">{errors.password.message}</p>}
                </div>
                <button className="loginbtn" type="submit">{loginBool ? "Sign In" : "Register"}</button>
                <div>
                    {loginBool ? <p>Don't have an account? <Link to="/register" title="Register here!">Register here!</Link></p> : <p>Already have an account? <Link to="/portal" title="Sign in here!">Sign in here!</Link></p>}
                </div>
            </form>
        </div>
        </>
    )
}
