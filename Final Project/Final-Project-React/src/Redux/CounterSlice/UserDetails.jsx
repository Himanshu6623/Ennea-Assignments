import { createSlice } from "@reduxjs/toolkit";

const initialState={
    admin:[
        {
            id:-1,
            email:""
        }
    ],
    student:[
        {
            rollno:"",
        }
    ]
}

export const UserDetails=createSlice({
    name:"editInfo",
    initialState,
    reducers :{
        NewAdminDetails:(state,action)=>{
            state.admin.pop()
            state.admin.push(action.payload)
        },
        NewStudentDetails:(state,action)=>{
            state.student.pop()
            state.student.push(action.payload)
        }
    }
})

export const {NewAdminDetails, NewStudentDetails}=UserDetails.actions
export default UserDetails.reducer