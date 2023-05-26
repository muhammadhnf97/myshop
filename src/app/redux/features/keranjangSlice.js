import { createSlice } from "@reduxjs/toolkit";

const keranjangSlice = createSlice({
    name: "keranjang",
    initialState: [],
    reducers :{
        updateKeranjang: (state, action)=>{
            return action.payload
        }
    }
})

export const  { updateKeranjang } = keranjangSlice.actions
export default keranjangSlice.reducer