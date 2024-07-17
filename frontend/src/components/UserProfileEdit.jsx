import React, { useEffect, useState } from 'react'
import FormContainer from './FormContainer'
import { Button, Form,} from 'react-bootstrap'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import { toast ,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateUserMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { firebaseStore } from '../config/firbaseConfig'

function userProfileEdit() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [image,setImage] = useState(null)


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ updateProfile ] = useUpdateUserMutation()
    const { userInfo } = useSelector((state)=> state.auth)
    useEffect(()=>{
        setName(userInfo.name)
        setEmail(userInfo.email)
    },[userInfo.setName,userInfo.setEamil])

    const submitHandler = async(e) =>{
        e.preventDefault()
        let imageUrl
            try {
                if(image){
                    const storageRef = ref(firebaseStore,`/image/${image.name}`)
                    const snapshot = await uploadBytes(storageRef, image)
                    imageUrl = await getDownloadURL(snapshot.ref)
                    console.log(imageUrl)
                }
                const res = await updateProfile({
                     _id:userInfo._id,
                     name, 
                     email,
                     image:imageUrl
                    }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate('/profile')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
                console.log(err.message)
            }      
    } 

  return (
    <>
    <Header />
    <ToastContainer/>
    <FormContainer>
        <h1 className='text-center'>Update Profile</h1>

        <Form onSubmit={submitHandler} >
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' required value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter name' />
            </Form.Group>

            <Form.Group className='my-2' controlId='email' >
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter email' />
            </Form.Group>

            <Form.Group className='my-2' controlId='email' >
                <Form.Label>Profile picture</Form.Label>
                <Form.Control type='file' onChange={(e)=> setImage(e.target.files[0])} />
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3 ' >
                Edit
            </Button>

        </Form>
    </FormContainer>
    </>
  )
}

export default userProfileEdit