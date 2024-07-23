import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { toast ,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { useSignupMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'

function Signup() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ signup ] = useSignupMutation()
    const { userInfo } = useSelector((state)=> state.auth)
    useEffect(()=>{
        if(userInfo){
            navigate('/profile')
        }
    },[userInfo, navigate])
    const submitHandler = async(e) =>{
        e.preventDefault()
        if(!name.match(/^[a-z][a-z ]{2,10}/i)){
            toast.error('Enter proper name')
        }else if(!email.match(/^[a-z0-9._]+@[a-z0-9.]+\.[a-z]{2,}$/i)){
            toast.error('Enter proper email')
        }else if(!password.trim().match(/^.{4,}/i)){
            toast.error('Password at least 4 characters')
        }else if(password !== confirmPassword){
            toast.error('Passwords do not match')
        }else{
            try {
                const res = await signup({ name, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate('/profile')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

  return (
    <>
    <Header/>
    <ToastContainer/>
    <FormContainer>
        <h1 className='text-center'>Sign Up</h1>

        <Form onSubmit={submitHandler} >
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control required type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter name' />
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter email' />
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' required value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter password' />
            </Form.Group>
            <Form.Group className='my-2' controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} placeholder='Enter confirm password' />
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3 ' >
                Sign Up
            </Button>

            <Row>
                <Col  className='text-center'>
                   Already have an account?<Link to='/' >LogIn</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
    </>
  )
}

export default Signup