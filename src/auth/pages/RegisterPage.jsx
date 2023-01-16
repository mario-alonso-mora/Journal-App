
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";


const formData = {
  email:'',
  displayName:'',
  password:''
}

const formValidations = {

  email:[ (value) => value.includes('@'), 'El correo debe de contener una @.'],
  password:[ (value) => value.length >=6, 'El password debe de contener 6 caracteres.'],
  displayName:[ (value) => value.length >=1, 'El nombre es obligatorio.'],

}

export const RegisterPage = () => {


     const dispatch = useDispatch();

    const [FormSubmitted, setFormSubmitted] = useState(false);

    
    const {status,errorMessage} = useSelector(state =>state.auth);

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const {displayName,email,password,onInputChange,
      formState,isFormValid,emailValid,passwordValid,displayNameValid} = useForm(formData, formValidations);


  const onSubmit = (event) =>{


    event.preventDefault();

    setFormSubmitted(true);

    if(!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  }

 



  return (


    <AuthLayout  title="Crear cuenta">


      <form className="animate__animated animate__fadeInRight"
      
       onSubmit={onSubmit}>
        <Grid container>

        <Grid className="animate__animated animate__bounce animate__"  item xs={ 12 } sx={{ mb: 2 ,mt:2 }}>
            <TextField 
              label="Nombre Completo"
              type="text"
              placeholder="nombre completo"
              fullWidth
              name='displayName'
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && FormSubmitted }
              helperText={ displayNameValid }
            />
          </Grid>
        

          <Grid className="animate__animated animate__bounce animate__"  item xs={ 12 } sx={{ mb: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="Mario@gmail.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && FormSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid className="animate__animated animate__bounce animate__"  item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && FormSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>

          <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>

             <Alert severity="error">{errorMessage}</Alert>

            </Grid>


            <Grid item xs={12}>
              <Button disabled={isCheckingAuthentication} type="submit" variant="contained" fullWidth>
                Crear Cuenta
              </Button>
            </Grid>

          
          </Grid>

          <Grid  container direction="row" justifyContent="end">
            <Typography sx={{mr:1}}>¿Ya tienes Cuenta?</Typography>
           
           
            <Link underline="hover"
              component={RouterLink}
              to="/auth/login"
              color="rgb(92, 184, 92)"
             
             
            >
              ingresar
            </Link>
            
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
