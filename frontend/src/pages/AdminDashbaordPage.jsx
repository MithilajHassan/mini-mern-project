import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminComponents/AdminHeader'
import { Button, Container, Table } from 'react-bootstrap'
import { useDashboardMutation, useManageBlockMutation } from '../slices/adminApiSlice'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

function AdminDashbaordPage() {
    const [ getUsers ] = useDashboardMutation()
    const [ manageBlock ] = useManageBlockMutation()
    const [users,setUsers] = useState([])
    
    const navigate = useNavigate()
    
    const blockUser = async(_id,status)=>{
        try {
            if(confirm('Are you sure?')){
                const res = await manageBlock({_id,status}).unwrap()
                if(res.success == true){
                    getUsers().unwrap().then((res)=>{
                        setUsers(res.users)
                    })
                    toast.success('Successful')
                }
            }   
        } catch (err) {
            alert(err.message)
        }
    }
    useEffect(()=>{
         getUsers().unwrap().then((res)=>{
            setUsers(res.users)
         })
    },[])

  return (
    <>
     <AdminHeader/>
     <ToastContainer />
     <Container>
        <h2 className='my-2' >Dashboard</h2>
        <Table bordered hover className='text-center'>
            <thead>
                <tr>
                    <th colSpan={4} >Users</th>
                </tr>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { users ? users.map((user,i)=>{
                    return (<tr key={user._id} >
                        <td>{i+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isBlock ? <Button onClick={()=>blockUser(user._id,!user.isBlock)} variant='warning'>Unblock</Button>
                         : <Button onClick={()=>blockUser(user._id,!user.isBlock)} variant='danger' >Block</Button>}</td>
                    </tr>)
                }) : ('')}
            </tbody>
        </Table>
     </Container>
    </>
  )
}

export default AdminDashbaordPage