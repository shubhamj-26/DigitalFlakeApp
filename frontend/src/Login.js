import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Images from "./Images/logo.png";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/login', { email, password })
            .then(res => {
                console.log(res);
                console.log(res.status);
                if (res.status === 200) {
                    console.log(res.status);
                    navigate('/Welcome', { replace: true });
                } else {
                    console.log(res.status);
                    setAlertMessage('Incorrect email or password');
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                  setAlertMessage('Incorrect email or password'); // Handle 404 specifically
                } else {
                  console.log(err);
                  setAlertMessage('An error occurred'); // Generic error message for other errors
                }
              });
    }

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">

            <MDBRow>

                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6'>
                <img src={Images} className='logo' alt="My Image" style={{ width: '200px', height: '150px' }} />
                <label className='welcome-msg'>Welcome to Digitalflake Admin</label>
                {alertMessage && <div className={alertMessage.includes('Invalid') ? 'alert alert-danger' : 'alert alert-success'} role="alert">{alertMessage}</div>}
                    <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" onChange={e => setEmail(e.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" onChange={e => setPassword(e.target.value)} />

                    <div className="d-flex justify-content-between mb-4">
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                        <a href="/forgotpassword">Forgot password?</a>
                    </div>

                    <div className='text-center text-md-start mt-4 pt-2'>
                        <MDBBtn className="mb-0 px-5" size='lg' onClick={handleSubmit}>Login</MDBBtn>
                        <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="./signup" className="link-danger">Register</a></p>
                    </div>

                </MDBCol>

            </MDBRow>

            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2024. All rights reserved.
                </div>

                <div>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='facebook-f' size="md" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='twitter' size="md" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='google' size="md" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                        <MDBIcon fab icon='linkedin-in' size="md" />
                    </MDBBtn>

                </div>

            </div>

        </MDBContainer>
    );
}

export default Login;
