import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

function Register() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    function handleSubmitSignUp(event) {
        event.preventDefault();

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        axios.post('http://localhost:8081/signup', { email, pass })
            .then(res => {
                // console.log(res);
                // console.log(res.status);
                // if (res.status === 200) {
                //     console.log(res.status);
                //     navigate('/Login', { replace: true });
                // } else {
                //     console.log(res.status);
                // }
                navigate('/Login', { replace: true });
            })
            .catch(err => console.log(err));
    }
    function isValidEmail(email) {
        // Simple email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center'>
                <MDBCol lg='9' className='my-5'>
                    <h1 className="text-white mb-4">Apply for a job</h1>
                    <MDBCard>
                        <MDBCardBody className='px-4'>
                            <form onSubmit={handleSubmitSignUp}>
                                <MDBRow className='align-items-center pt-4 pb-3'>
                                    <MDBCol md='3' className='ps-5'>
                                        <h6 className="mb-0">Email ID</h6>
                                    </MDBCol>
                                    <MDBCol md='9' className='pe-5'>
                                        <MDBInput label='Email' size='lg' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </MDBCol>
                                </MDBRow>
                                <hr className="mx-n3" />
                                <MDBRow className='align-items-center pt-4 pb-3'>
                                    <MDBCol md='3' className='ps-5'>
                                        <h6 className="mb-0">Password</h6>
                                    </MDBCol>
                                    <MDBCol md='9' className='pe-5'>
                                        <MDBInput label='Password' size='lg' id='form2' type='password' value={pass} onChange={(e) => setPass(e.target.value)} />
                                    </MDBCol>
                                </MDBRow>
                                <hr className="mx-n3" />
                                <MDBBtn type='submit' className='my-4' size='lg' onClick={handleSubmitSignUp}>Sign Up</MDBBtn>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Register;
