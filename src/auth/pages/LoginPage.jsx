import { Google } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useMemo } from "react";

const formData = {
  email:'',
  password: ''
}

export const LoginPage = () => {

  const {status,errorMessage} = useSelector(state =>state.auth);

  
 const dispatch = useDispatch()



 const {email,password,onInputChange} = useForm(formData);

 const isAuthenticating = useMemo(() => status === 'checking', [status])

 const onSubmit = (event) =>{

  event.preventDefault();

  dispatch(startLoginWithEmailPassword({email,password}));
 }

 const onGoogleSignIn = ()=>{

  dispatch(startGoogleSignIn());
 
 }

  return (

    

    <AuthLayout  title="Login">

    


      <form className="animate__animated animate__fadeInLeft"
       onSubmit={onSubmit}>

        <Grid className="main" container item xs={12} sx={{ mt: 2 }}>
        

          <Grid className="animate__animated animate__bounce" item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="Introduzca su email para iniciar sesion"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid className="animate__animated animate__bounce"  item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

  
      
          <Grid container spacing={2} sx={{ mb: 1 }}>

            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>

            <Alert severity="error">{errorMessage}</Alert>

            </Grid>

            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button  disabled={isAuthenticating} onClick={onGoogleSignIn} variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent={"end"}>
            <Link 
              component={RouterLink}
              color="rgb(255, 99, 0)"
              to="/auth/register"
            >
              Crear Nueva Cuenta{" "}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
