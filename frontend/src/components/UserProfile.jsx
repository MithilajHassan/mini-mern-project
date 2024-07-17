import React from 'react'
import FormContainer from './FormContainer'
import { Button, Form, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import defaultAvatar from '/img/defaultAvatar.jpg'

function userProfile() {
   const { userInfo } = useSelector((state)=>state.auth)
  return (
    <>
    <FormContainer>
        <div className='d-flex align-items-center'>
            <Image src={(userInfo.profilePic) || defaultAvatar} alt='defaultAvatar' width={200} height={200} />
            <Link to='/profileupdate' ><Button variant='success' className='ms-3' size='lg' >Edit</Button></Link>
        </div>
        <Form >
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control readOnly type='text' value={userInfo.name} />
            </Form.Group>

            <Form.Group className='my-2' controlId='email' >
                <Form.Label>Email</Form.Label>
                <Form.Control readOnly type='email' value={userInfo.email} />
            </Form.Group>

        </Form>
    </FormContainer>
    </>
  )
}

export default userProfile