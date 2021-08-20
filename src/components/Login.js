import React from 'react'
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';
import "./Login.css";

function Login() {

    //Here, we push dispatch into useStateValue
    const [{}, dispatch] = useStateValue();

    // Google Authentication using firebase
    const signIn = () => {
        auth
          .signInWithPopup(provider)
          .then((result) => {
            dispatch({
                  //when user sign in then google returns the object, object contains the all information about user 
              type: actionTypes.SET_USER,
              user: result.user,
            });
          })
          .catch((error) => alert(error.message));
      };


      
    return (
        <div className="login">

            <div className="login__container">

                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt=""
                />
                
                <div className="login__text">
                    <h1>Sign in to WhatsApp Clone</h1>
                </div>

                <Button className="login__withGoogle" onClick={signIn}>

                     <span>
                     Sign in with Google 
                     </span>

                </Button>

            </div>

        </div>
    )
}

export default Login
