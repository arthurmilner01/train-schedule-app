import {useEffect, useState} from "react";
import {formatTime} from "../utils/helpers";

function CurrentTime() {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000) // Gets current time every second

        return () => clearInterval(timer) // Cleanup
    }, [])

    return (
        <div className="w-full flex flex-row 
        items-center justify-center">
            <p className="text-5xl">
                {formatTime(currentTime)}
            </p>
        </div>
    )
}

export default CurrentTime;

