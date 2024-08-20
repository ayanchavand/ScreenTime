import React from "react";
import { useState, useEffect } from "react";


import {auth} from '../utils/firebase'

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
        <>  
            <div className='flex flex-col items-center justify-center h-screen'>
                <p>Hello, {auth.currentUser.displayName}</p>
                <h1 className="text-9xl m-6">
                {hours}:{minutes}:{seconds}
                </h1>
                <h5 className="">Current Session</h5>
                <button onClick={() => auth.signOut()} className="border border-spacing-2 p-2 bg-or m-4">Sign Out</button>
            </div>
        </> 
        
        
    )
}