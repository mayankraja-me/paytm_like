import { BottomWarm } from "../components/BottomWarn"
import { Button } from "../components/Button"
import { Heading } from "../components/heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-80 text-center px-10 pb-8">
                <Heading title={"Sign in"} />
                <SubHeading msg={"Enter your credentials to access your account"} />
                <InputBox title={"Email"} placeholder={"mayank@gmail.com"} />
                <InputBox title={"Password"} placeholder={"123456"} />
                <div className="pt-4">
                    <Button label={"Sign in"} />
                </div>
                <BottomWarm label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}