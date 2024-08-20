import React from "react";
import {auth} from '../utils/firebase'
    
export default function SignIn(){
    const onSignInWithGoogle = () =>{
        const provider = new auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    return(
        <div className="flex items-center justify-center h-screen">
            <button onClick={onSignInWithGoogle} className="border border-spacing-2 p-2 bg-or text-xl ">Sign in with Google</button>
        </div>
    )    
 }