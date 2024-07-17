import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Card, Container } from 'react-bootstrap'

function Hero() {
  return (
    <div className='py-5'>
        <Container className='d-flex justify-content-center' >
            <Card className='p-5 d-flex flex-column align-items-center bg-light w-75' >
                <h1 className='text-center mb-4' >Facegram</h1>
                <p className='text-center mb-4' >
                There are many variations of passages of Lorem Ipsum available, 
                but the majority have suffered variations of passages alteration in some form, by injected
                humour, or randomised words which don't look even slightly believable
                </p>
                <div className='d-flex'>
                    <LinkContainer to='/signup'><Button variant='primary' className='me-3' >Signup</Button></LinkContainer>
                    <LinkContainer to='/'><Button variant='secondary' >Login</Button></LinkContainer>
                </div>
            </Card>
        </Container>
    </div>
  )
}

export default Hero