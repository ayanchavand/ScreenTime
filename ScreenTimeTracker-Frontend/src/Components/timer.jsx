import React from "react";
import { useState, useEffect } from "react";

export default function Timer(){
    const [time, setTime] = useState(0)
    
    useEffect(() => {
        let intervalId = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
        
        return () => clearInterval(intervalId); // Clear interval on unmount
    }, []);

    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');

    return(
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className="text-9xl ">
            {hours}:{minutes}:{seconds}
            </h1>
            <h5 className="">Current Session</h5>
        </div>
        
    )
}