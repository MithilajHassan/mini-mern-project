import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function FormContainer({ children }) {
  return (
    <Container>
        <Row className='justify-content-md-center mt-5' >
            <Col xs={12} md={6} className='card bg-light p-4'>
            { children }
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer