import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom"

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white pb-6">

                <div className="flex flex-col space-y-1.5 p-6">
                    <div className="text-3xl font-bold text-center">Send Money</div>
                </div>

                <div className="space-x-4 flex items-center">
                    <div className="rounded-full w-12 h-12 bg-green-500 flex items-center justify-center">
                        <span className="text-white text-2xl"> A </span>
                    </div>
                    <div className="text-2xl font-semibold">{name}</div>
                </div>

                <div className="font-medium">Amount (in Rs)</div>

                <div>
                    <input 
                    onChange={e => {
                        setAmount(e.target.value);
                    }}
                    type="number" 
                    placeholder="Enter Amount" 
                    id="amount"
                    className="border w-full h-10 rounded-md px-3 py-2"/>
                </div>

                <button onClick={() => {
                    axios.post("https://paytm-like-api.vercel.app/api/v1/account/transfer", {
                        to: id,
                        amount
                    }, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
                }} className="justify-center rounded-md text-sm font-medium h-10 w-full bg-green-500 text-white px-4 py-2">
                    Initiate Transfer
                </button>
            </div>
        </div>

    </div>

}
