import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button,  Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer,toast } from 'react-toastify'
import { useAdminLoginMutation } from '../../slices/adminApiSlice'
import { setCredentials } from '../../slices/adminAuthSlice'
import FormContainer from '../../components/FormContainer'
import 'react-toastify/dist/ReactToastify.css'

function AdminLogin() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ AdminLogin ] = useAdminLoginMutation()

    const { adminInfo } = useSelector((state)=> state.adminAuth)

    useEffect(()=>{
        if(adminInfo){
            navigate('/admin/dashboard')
        }
    },[adminInfo, navigate])

    const submitHandler = async(e) =>{
        e.preventDefault()
        try {
            const res = await AdminLogin({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate('/admin/dashbaord')
        } catch (err) {
          toast.error(err?.data?.message || err.error)  
        }
    }
  return (
    <>
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

        </Form>
    </FormContainer>
    </>
  )
}

export default AdminLogin