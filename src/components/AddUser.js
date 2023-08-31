import { Button, IconButton, Snackbar, TextField } from '@mui/material'
import './style.css';
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import CloseIcon from '@mui/icons-material/Close'
import {useNavigate} from 'react-router-dom'

export default function AddUser() {


    const [open,setOpen]=useState(false);
    const nav = useNavigate()

    const handleClose = () => {
        setOpen(false)
        nav('/userlist')
        return;
    }

    const action = (
        <React.Fragment>
            <IconButton size='small' color='inherit' onClick={handleClose}>
                <CloseIcon></CloseIcon>
            </IconButton>
        </React.Fragment>
    )


    const formik = useFormik({

        //initial values
        initialValues: {
            email: '',
            password: ''
        },

        //on submit
        onSubmit: values => {
            console.log(values)
            fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                .then(success => {
                    setOpen(true)

                }).catch(error => alert('Error with the server, please check the db.json'))
        },

        //add validations
        validationSchema: yup.object().shape({

            email: yup.string()
                .email('Invalid email format')
                .required('Email cannot be empty')
            ,
            password: yup.string()
                .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Password not meeting the conditions')
                .required('Password cannot be empty')

        })
    })



    return (
        <div className='container'>

            <div className="row">
                <div className="register-form col-md-4 offset-md-4 text-center mt-2 text-uppercase text-white rounded">
                    <h4>Register</h4>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-md-4 offset-md-4 text-center mt-3">


                        {
                            formik.errors.email && formik.touched.email
                                ?
                                <TextField
                                    fullWidth
                                    error
                                    id="standard-error-helper-text"
                                    label="Error"
                                    helperText={formik.errors.email}
                                    variant="outlined"
                                    size="small"
                                    name='email'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />

                                :

                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Enter Username"
                                    size="small"
                                    variant="outlined"
                                    name='email'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                        }

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 offset-md-4 text-center mt-3">


                        {
                            formik.errors.password && formik.touched.password
                                ?

                                <TextField
                                    fullWidth
                                    error
                                    id="standard-error-helper-text"
                                    label="Enter Password"
                                    helperText={formik.errors.password}
                                    variant="outlined"
                                    size="small"
                                    name='password'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />

                                :
                                <TextField
                                    fullWidth
                                    id="fullWidth"
                                    label="Enter Password"
                                    size="small"
                                    variant="outlined"
                                    name='password'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                        }

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-4 text-center mt-2">
                        <Button disabled={!formik.isValid} type="submit" variant="contained">Register</Button>
                    </div>
                </div>
            </form>
            <Snackbar 
                    open={open} 
                    autoHideDuration={2000} 
                    onClose={handleClose} 
                    message="Registered Successfully"
                    action={action}
                />

        </div>
    )
}
