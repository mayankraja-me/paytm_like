import axios from "axios"
import { useEffect, useState } from "react"

export const Balance = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
            });
            setBalance(response.data.balance);
        }

        fetchBalance();
    }, []);

    return <div className="flex">
        <div className="text-lg font-bold"> Your Balance </div>
        <div className="text-lg font-semibold ml-4"> Rs {balance !==null ? balance : "Loading..."} </div>
    </div>
}