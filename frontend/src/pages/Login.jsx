import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer,toast } from 'react-toastify'
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import FormContainer from '../components/FormContainer'
import Header from '../components/Header'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ login ] = useLoginMutation()

    const { userInfo } = useSelector((state)=> state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/profile')
        }
    },[userInfo, navigate])

    const submitHandler = async(e) =>{
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate('/profile')
        } catch (err) {
          toast.error(err?.data?.message || err.error);  
        }
    }

  return (
    <>
    <Header/>
    <ToastContainer />
    <FormContainer>
        <h1 className='text-center'>Log In</h1>

        <Form onSubmit={submitHandler} >
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control required type='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter email' />
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter password' />
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3 ' >
                Log In
            </Button>

            <Row>
                <Col  className='text-center'>
                   New Customer?<Link to='/signup' >SignUp</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
    </>
  )
}

export default Login