import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LuLogIn, LuLogOut } from "react-icons/lu"
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/userApiSlice'
import { logout } from '../slices/authSlice'
import { FaUserCircle } from "react-icons/fa"

function Header() {
  const { userInfo } = useSelector((state)=> state.auth)
  const [ logoutApiCall ] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (err) {
      
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
            
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <Nav.Link><FaUserCircle />{userInfo.name}</Nav.Link>
                  <Nav.Link onClick={ logoutHandler } ><LuLogOut />Logout</Nav.Link>
                </>
              ) : (
                <LinkContainer to='/login' ><Nav.Link><LuLogIn/>Login</Nav.Link></LinkContainer>
              )}
            
            
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header