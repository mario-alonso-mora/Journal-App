
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth';
import { FireBaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async() =>{

    try {
        
        const result = await signInWithPopup(FireBaseAuth,googleProvider);

        //const credentials = GoogleAuthProvider.credentialFromResult(result);

        // const user = result.user;
        //   console.log(user);

        const {displayName,email,photoURL,uid} = result.user;
        
        return  {
            ok:true,
            //User info
            displayName,
            email,
            photoURL,
            uid,
        }
     


    } catch (error) {

         // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok:false,
            errorMessage,
        }
    }


}

    export const registerUserWithEmailPassword = async ({email,password,displayName}) =>{


        try {

           const resp = await createUserWithEmailAndPassword(FireBaseAuth,email,password);
            const {uid,photoURL} = resp.user;
       
           
          await updateProfile(FireBaseAuth.currentUser, {displayName});

           return {
            ok:true,
            uid,
            photoURL,
            email,
            displayName,

           }

            
        } catch (error) {
                
            return{ ok:false , errorMessage:'El correo electronico ya ha sido registrado anteriormente'}

        }

    };


    export const LoginUserWithEmailPassword = async ({email,password}) =>{


        try {

           const response = await signInWithEmailAndPassword(FireBaseAuth,email,password);

           
          
            const {uid,photoURL,displayName} = response.user;
       

           return {
            ok:true,
            uid,
            photoURL,
            displayName,
            

           }

            
        } catch (error) {
                
            return{ ok:false , errorMessage:'Email o contraseña erronea'}

        }

    }

    export const logOutFirebase = async() =>{
        

        return await FireBaseAuth.signOut();

    }