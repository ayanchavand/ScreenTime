import './App.css'
import Timer from './Components/timer'
import Header from './Components/header'
import SignIn from './Components/signIn'

import {auth} from './utils/firebase'

import {useAuthState} from 'react-firebase-hooks/auth'

function App() {
  const [user] = useAuthState(auth)  
  return (
    <>
      {user ? <Timer/> : <SignIn/>}
    </>
  )
}

export default App
