import React from 'react'
import Image from 'next/image'
import { RxMagnifyingGlass } from 'react-icons/rx'

const ListItems = ({ data, radioSelected, currentPage, totalPage, indexOfFirstItem, indexOfLastItem, handlePageChange, handleClickDetailItem }) => {

  const currentItems = data.sort((a, b)=> radioSelected === 1 ? b.harga - a.harga : a.harga - b.harga).slice(indexOfFirstItem, indexOfLastItem)

  const renderButton = () => {
    const buttons = []
    
    if(currentPage > 1){
      buttons.push(
        <>
        <button className={`w-12 h-8 shadow-md rounded-lg bg-blue-400`} onClick={()=>handlePageChange(1)}>First</button>
        <p>...</p>
        </>
      )
    }
  
    if(currentPage > 1 ){
      buttons.push(
        <button className={`w-12 h-8 shadow-md rounded-lg bg-blue-400`} onClick={()=>handlePageChange(currentPage - 1)}>{currentPage - 1}</button>
      )
    }

    buttons.push(
      <button className={`w-12 h-8 shadow-md rounded-lg bg-white`} onClick={()=>handlePageChange(currentPage)}>{currentPage}</button>
    )
    
    if(currentPage < totalPage){
      buttons.push(
        <button className={`w-12 h-8 shadow-md rounded-lg bg-blue-400`} onClick={()=>handlePageChange(currentPage + 1)}>{currentPage + 1}</button>
      )
    }

    if(currentPage !== totalPage){
      buttons.push(
        <>
        <p>...</p>
        <button className={`w-12 h-8 shadow-md rounded-lg bg-blue-400`} onClick={()=>handlePageChange(totalPage)}>Last</button>
        </>
      )
    }

    return buttons
  }

  return (
    <>
    <div className="md:flex md:p-5 md:justify-end md:items-end md:flex-col space-y-2">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:w-2/3">
        {
          currentItems.map(value=>(
            <div key={value.id} className="shadow-md rounded-lg p-3 flex flex-col bg-white bg-opacity-80 duration-200 space-y-3 hover:bg-opacity-100">
              <div className='w-full flex gap-5 items-center border'>
                <Image src={value.foto} alt="foto" width={150} height={150} className="border" />
                <div className="flex-1 space-y-1">
                  <div>
                    <p className="font-bold">{value.nama}</p>
                    <p className="text-xl">{value.harga.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
                  </div>
                  <p>Sisa Stok <span className="font-semibold">{value.stock}</span></p>
                  <div className="w-full flex flex-wrap text-gray-500 gap-1">
                    {
                      typeof(value.konsol) === 'object' ? value.konsol.map((data, index)=>(
                          <div key={index} className={`rounded-2xl px-5 ${data === "Playstation 5" ? 'bg-blue-900 text-white' : 'bg-red-500 text-white'}`}>{data}</div>
                          ))  : <div className={`rounded-3xl px-5 ${value.konsol === "Playstation 5" ? 'bg-blue-900 text-white' : 'bg-red-500 text-white'}`}>{value.konsol}</div>
                    }
                  </div>
                </div>
              </div>
              <button className='w-full bg-green-400 hover:bg-green-500 active:bg-green-600 rounded-xl px-5 py-1 flex gap-2 items-center justify-center' onClick={()=>handleClickDetailItem(value.id)}><RxMagnifyingGlass className="h-6 w-6" />More Details</button>
            </div>
          ))
        }
      </div>
      <div className='w-full md:w-2/3 py-1 flex justify-center items-end gap-3'>
        {
          renderButton()
        }
      </div>
    </div>

    </>
  )
}

export default ListItems