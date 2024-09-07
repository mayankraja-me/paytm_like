import { Link } from "react-router-dom"

export const BottomWarm = ({ label, buttonText, to }) => {
    return <div className="py-2 flex justify-center">
        <div> {label} </div>
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>
            {buttonText}
        </Link>
    </div>
}