import React, { useRef, useState } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LuLogIn, LuLogOut } from "react-icons/lu"
import { useDispatch, useSelector } from 'react-redux'
import { useAdminLogoutMutation, useDashboardMutation } from '../../slices/adminApiSlice'
import { logout } from '../../slices/adminAuthSlice'
import { FaUserCircle } from "react-icons/fa"
import { setUsers } from '../../slices/usersSlice'

function AdminHeader() {
  const { adminInfo } = useSelector((state)=> state.adminAuth)
  const searchRef = useRef()
  const [ getUsers ] = useDashboardMutation()
  const [ logoutApiCall ] = useAdminLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/admin/login')
    } catch (err) {
      alert(err.message)
    }
  }

  const searchHandler = async(e)=>{
      e.preventDefault()
      try {
        const search = searchRef.current.value
        if(search === ''){
          searchRef.current.focus()
        }else{
          const res = await getUsers({search}).unwrap()  
          dispatch(setUsers(res.users))
        }
      } catch (err) {
        console.log(err)
      }
      
  }
  return (
    <header>
    <Navbar collapseOnSelect expand="lg" fixed="" bg="info" >
    <Container>
      <LinkContainer to='/' >
        <Navbar.Brand>Facegram</Navbar.Brand>
      </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

         { adminInfo && <Nav className='ms-auto'>
          <Form className="d-flex" onSubmit={searchHandler} >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              ref={searchRef}
            />
            <Button type='submit' variant="outline-dark">Search</Button>
          </Form>
          </Nav>}
        
        <Nav className='ms-auto'>
          {adminInfo && (
            <>
              <Nav.Link><FaUserCircle />{adminInfo.name}</Nav.Link>
              <Nav.Link onClick={ logoutHandler } ><LuLogOut />Logout</Nav.Link>
            </>
          )}
        
        
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
</header>
  )
}

export default AdminHeader