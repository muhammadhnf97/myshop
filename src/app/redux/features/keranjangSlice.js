import { createSlice } from "@reduxjs/toolkit";

const keranjangSlice = createSlice({
    name: "keranjang",
    initialState: [{
        idBelanja: 1,
        namaBarang: 'BattleField 2042',
        jumlahBeli: 2,
        totalBayar: 730000,
        tglBeli: "24/05/2023",
        fotoBarang: "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/7/23/e60d5a45-c970-43d8-9646-2847fe536776.jpg"
    }],
    reducers :{
        updateKeranjang: (state, action)=>{
            return action.payload
        }
    }
})

export const  { updateKeranjang } = keranjangSlice.actions
export default keranjangSlice.reducer