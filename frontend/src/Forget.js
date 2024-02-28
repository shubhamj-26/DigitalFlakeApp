import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn,  MDBInput,  } from 'mdb-react-ui-kit';
import axios from 'axios';


function Forget(){

    const [email, setEmail] = useState('');

    const [alertMessage, setAlertMessage] = useState('');


    function handleForgotPassword(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/forgotpassword', { email })
            .then(res => {
                console.log(res);
                if (res.data.success) {
                    setAlertMessage('Reset link sent to your email.');
                } else {
                    setAlertMessage('Email not found');
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                  setAlertMessage('Email not found'); // Handle 404 specifically
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
                    {alertMessage && <div className={alertMessage.includes('Invalid') ? 'alert alert-danger' : 'alert alert-success'} role="alert">{alertMessage}</div>}
                    <h3 className="mb-4">Did you forget your password?</h3>
                    <p className="mb-4">Enter your email address and we'll send you a link to restore password</p>
                    <form onSubmit={handleForgotPassword}>
                        <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" onChange={e => setEmail(e.target.value)} />
                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg' type="submit">Request reset link</MDBBtn>
                        </div>
                    </form>
                    <div className="mt-3">
                        <a href="/login">Back to Log in</a>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Forget;