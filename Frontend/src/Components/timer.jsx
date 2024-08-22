    import React from "react";
    import { useState, useEffect, useRef } from "react";
    import {auth, firestore, doc, setDoc, getDoc} from '../utils/firebase'
    import '../utils/time'
import { toHour, toMin, toSec } from "../utils/time";


    //TODO: break this into smaller components 
    //cuz this is basically the home page now
    export default function Timer(){
        const [time, setTime] = useState(0)
        const [userData, setUserData] = useState({})
        const seshArrRef = useRef([])
        const userDoc = doc(firestore, 'users/' + auth.currentUser.uid)

        const now = new Date()
        const today = now.toISOString().split('T')[0]

        //DA DATA FETCH HOOK
        useEffect(() =>{
            const getUserData = async () =>{
                try{
                    const data = (await getDoc(userDoc)).data()
                    setUserData(data)

                    console.log(data)
                    //this just copies the session array to local array and
                    //that bracket is for dynamic key stuff
                    seshArrRef.current = [...data.screenTime[today].sessionTimeArray,0]
                    console.log('inside session lol: '+ seshArrRef.current)
                }
                catch(error){
                    //nice error message, have fun figuring out what oops
                    //means in your console when something breaks lol
                    console.error('oops')
                }
            }
            getUserData()
        },[])
        
        //DA TIME INCREMENT HOOK
        useEffect(() => {
            let intervalId = setInterval(() => setTime(prevTime => prevTime + 1), 1000)
            return () => clearInterval(intervalId) // Clear interval on unmount
        }, []);

        /*
        useEffect(() => {
            const writeData = async () =>{
                console.log(today)
                const userData = {
                    lastSessionDate: today,
                    screenTime: {
                        [today]: {
                            sessionTimeArray: []
                        }
                    }
                }
                try{
                    setDoc(userDoc,userData, {merge: true})
                } catch(error){
                    console.error('HMMMMM')
                }  
            }
            
            writeData()
        }, [])

        */
        const hours = toHour(time)
        const minutes =toMin(time)
        const seconds = toSec(time)
        let savedTime = 0
        seshArrRef.current.forEach(number => {
            // Add the current element to the sum
            savedTime += number;
          })
        
        //DA PER MIN UPDATE CYCLE HOOK
        useEffect(() =>{
            seshArrRef.current[seshArrRef.current.length - 1] = time; 
            const writeData = async () =>{
                const now = new Date()
                const today = now.toISOString().split('T')[0]
                const userData = {
                    screenTime: {
                        [today]: {
                            sessionTimeArray: seshArrRef.current
                        }
                    }
                }
                try{
                    console.log("new entry added    ")
                    setDoc(userDoc,userData, {merge: true})
                } catch(error){
                    console.error(error.message)
                }  
            }
             if (time !== 0 && time % 60 === 0) {
                writeData();
             } 
        }, [minutes])
    
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
                    <h4 className="m-2">Current Session</h4>
                    <p>Last Session: {userData.lastSessionDate}</p>
                    <button onClick={() => auth.signOut()} className="border border-spacing-2 p-2 bg-or m-4">Sign Out</button>

                    <p className="mt-8">Total Time Today: {toHour(savedTime)}:{toMin(savedTime)}: {toSec(savedTime)}</p>
                </div>
            </>  
        )
    }