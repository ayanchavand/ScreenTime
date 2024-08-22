import React from "react";
import { useState, useEffect } from "react";
import {auth, firestore, doc, setDoc} from '../utils/firebase'


//TODO: break this into smaller components cuz this is basically the home page
export default function Timer(){
    const [time, setTime] = useState(0)
    const userDoc = doc(firestore, 'users/' + auth.currentUser.uid) 

    useEffect(() => {
        let intervalId = setInterval(() => setTime(prevTime => prevTime + 1), 1000)
        return () => clearInterval(intervalId) // Clear interval on unmount

    }, []);

    useEffect(() => {
        const writeData = async () =>{
            const now = new Date();
            const today = now.toISOString().split('T')[0];
            console.log(today);
            const userData = {
                lastSessionDate: today
            }
            try{
                setDoc(userDoc,userData, {merge: true})
            } catch(error){
                console.error('HMMMMM')
            }
            
        }
        
        writeData()
    }, [])

    const hours = String(Math.floor(time / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0')
    const seconds = String(time % 60).padStart(2, '0')

    /*
    useEffect(() =>{
        const userData = {
            
        }
    },[minutes])
    */
    return(
        <> 
            <div className='flex flex-col items-center justify-center h-screen'>
                <img src={auth.currentUser.photoURL} className="rounded-full m-4"></img>
                <p>Hello, {auth.currentUser.displayName}</p>
                <h1 className="text-9xl m-5">
                {hours}:{minutes}:{seconds}
                </h1>
                <h4 className="">Current Session</h4>
                <button onClick={() => auth.signOut()} className="border border-spacing-2 p-2 bg-or m-4">Sign Out</button>
            </div>
        </> 
        
        
    )
}