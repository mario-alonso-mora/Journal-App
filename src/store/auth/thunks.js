
import { async } from "@firebase/util";
import { LoginUserWithEmailPassword, logOutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogOut } from "../journal/journalSlice";
import { checkingCredentials, logout, login } from "./authSlice";

export const checkingAuthentication = (email, password) => {

  return async (dispatch) => {

    dispatch(checkingCredentials());

  };

};

export const startGoogleSignIn = () => {

  return async (dispatch) => {

    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok) return dispatch(logout(result));

   

    dispatch(login(result));
  };

};

export const startCreatingUserWithEmailPassword = ({email,password,displayName}) =>{

  return async(dispatch) => {

    dispatch(checkingCredentials());


   const {ok,uid,photoURL,errorMessage} = await registerUserWithEmailPassword({email,password,displayName});

    if(!ok) return dispatch(logout({errorMessage}))

    dispatch(login({uid,displayName,email,photoURL}));

  }

};


export const startLoginWithEmailPassword = ({email,password}) =>{

  return async(dispatch) => {

    dispatch(checkingCredentials());


   const response = await LoginUserWithEmailPassword({email,password});

    if(!response.ok) return dispatch(logout(response));

    dispatch(login(response));

  }

}

export const startLogOut = () => {

  return async( dispatch)=>{

     await logOutFirebase();

     dispatch(logout());

     dispatch(clearNotesLogOut())

  }

}



