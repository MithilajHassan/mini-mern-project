import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LuLogIn, LuLogOut } from "react-icons/lu"
import { useDispatch, useSelector } from 'react-redux'
import { useAdminLogoutMutation } from '../../slices/adminApiSlice'
import { logout } from '../../slices/adminAuthSlice'
import { FaUserCircle } from "react-icons/fa"

function AdminHeader() {
    const { adminInfo } = useSelector((state)=> state.adminAuth)
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
          {adminInfo ? (
            <>
              <Nav.Link><FaUserCircle />{adminInfo.name}</Nav.Link>
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

export default AdminHeader