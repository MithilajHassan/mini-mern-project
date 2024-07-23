import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[]
}

const usersDetails = createSlice({
    name:'users',
    initialState,
    reducers:{
        setUsers: (state,action)=>{
            state.users = action.payload
        }
    }
})

export const { setUsers } = usersDetails.actions
export default usersDetails.reducer