
import React from 'react'

const FilterMenu = ({ filterValue, handleChangeFilterValue, handleChangeSortirHarga, radioSelected }) => {
  return (
        <div className='w-full bg-white bg-opacity-70 p-5 rounded-lg border-2 border-white shadow-lg space-y-2 md:w-96 md:flex md:flex-col md:space-y-3 md:fixed md:top-5'>
            <h2 className="font-semibold">Filter</h2>
            <input type="text" name="nama" value={filterValue?.nama} onChange={(e)=>handleChangeFilterValue(e, 'nama')} placeholder="Nama game .." className="px-3 h-10 w-full"/>
            <select name="konsol" onChange={(e)=>handleChangeFilterValue(e, 'konsol')} className="px-3 h-10 w-full">
                <option>All Games</option>
                <option>Playstation 5</option>
                <option>Nintendo Switch</option>
            </select>
            <h2 className='font-semibold'>Urutkan Berdasarkan Harga</h2>
            <div className="w-full flex items-center ">
                <input type="radio" value={1} checked={radioSelected === 1} name="sortirTertinggi"  className="w-5 h-5" onChange={()=>handleChangeSortirHarga(1)} />
                <p className="px-2">Urutkan dari harga Tertinggi</p>    
            </div>
            <div className="w-full flex items-center ">
                <input type="radio" value={2} checked={radioSelected === 2} name="sortirTerendah"  className="w-5 h-5" onChange={()=>handleChangeSortirHarga(2)} />
                <p className="px-2">Urutkan dari harga terendah</p>
            </div>
        </div>
  )
}

export default FilterMenu