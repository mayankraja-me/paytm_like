import { useState } from "react"
import { BottomWarm } from "../components/BottomWarn"
import { Button } from "../components/Button"
import { Heading } from "../components/heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-80 text-center px-10 pb-8">
                <Heading title={"Sign up"} />
                <SubHeading msg={"Enter your information to create an account"} />
                <InputBox onChange={e => {
                    setFirstName(e.target.value);
                }} title={"First Name"} placeholder={"John"} />
                <InputBox onChange={e => {
                    setLastName(e.target.value)
                }} title={"Last Name"} placeholder={"Doe"} />
                <InputBox onChange={e => {
                    setUsername(e.target.value)
                }} title={"Email"} placeholder={"mayank@gmail.com"} />
                <InputBox onChange={e => {
                    setPassword(e.target.value)
                }} title={"Password"} placeholder={"123456"} />
                <div className="pt-4">
                    <Button onClick={async () => {
                        const response = await axios.post("https://paytm-like-api.vercel.app/api/v1/user/signup", {
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }} label={"Sign up"} />
                </div>
                <BottomWarm label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}
