import React from "react";
import { useState, useEffect } from "react";
export default function Timer(){
    
    return(
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className="text-9xl ">
            00:00:02
            </h1>
            <h5 className="">Current Session</h5>
        </div>
        
    )
}