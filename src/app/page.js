'use client'

import { useEffect, useState } from "react";
import ListItems from "./components/ListItems";
import FilterMenu from "./components/FilterMenu";
import { ImCart } from 'react-icons/im'
import DetailItem from "./components/DetailItem";
import Keranjang from "./components/Keranjang";
import Image from "next/image";

async function getProduct() {
  try {
    const res = await fetch(`/db.json`);
    const data = await res.json()
    return data.product;
  } catch (error) {
    return error
  }
}

async function searchProduct(filter, konsol=null) {
  try {
    const res = await fetch(`/db.json`);
    const data = await res.json()
    const ubahData = data.product.filter(dat=>dat.nama.toLowerCase().includes(filter.toLowerCase()) || dat.konsol.includes(filter))
    return ubahData
  } catch (error) {
    return error
  }

}

export default  function Home() {
  const [data, setData] = useState([])
  const [filterValue, setFilterValue] = useState({
    nama: '',
    konsol: ''
  })
  const [radioSelected, setRadioSelected] = useState(2)

  const [isKeranjang, setIsKeranjang] = useState(false)
  const [isDetailItem, setIsDetailItem] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 6
  const totalPage = Math.ceil(data.length / itemPerPage)
  const indexOfLastItem = currentPage * itemPerPage
  const indexOfFirstItem = indexOfLastItem - itemPerPage

  const [itemDetail, setItemDetail] = useState(null)

  const [isLoading, setIsLoading] = useState(true)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChangeFilterValue = (e, field) => {
    setFilterValue(prev=>{
      return field === 'nama' ? {...prev, nama: e.target.value} : 
      field === 'konsol' ? {...prev, konsol: e.target.value} : 
      field === 'hargaMinimum' ? {...prev, hargaMinimum: e.target.value} : {...prev, hargaMaximum: e.target.value}
    })
  }

  useEffect(()=>{
    if(filterValue.nama.length > 0){
      searchProduct(filterValue.nama).then(product=>setData(product))
    } else if(filterValue.konsol.length > 0 && filterValue.konsol !== 'All Games') {
      searchProduct(filterValue.konsol).then(product=>setData(product))
    } else {
      getProduct().then(product=>setData(product))
    }
    currentPage !== 1 ? setCurrentPage(1) : currentPage
  }, [filterValue])


  const handleChangeSortirHarga = (selected) => {
    selected === 1 ? setRadioSelected(1) : setRadioSelected(2)
  }

  useEffect(()=>{
    getProduct().then(value=>setData(value))
    setIsLoading(false)
  }, [])

  const handleClickDetailItem = (id) => {
    setItemDetail(data.find(product=>product.id === id))
    setIsDetailItem(prev=>!prev)
  }

  const handleClickCloseDetailItem = () => {
    setIsDetailItem(prev=>!prev)
  }

  const handleClickKeranjang = () => {
    setIsKeranjang(prev=>!prev)
  }
  
  console.log(data)

  return (
    <>
    {
      isLoading && 
      <div className='w-screen h-screen bg-black bg-opacity-70 flex items-center justify-center fixed z-20'>
      <Image src={'/images/loading.png'} alt='loading' width={50} height={50} className='object-center animate-spin' />
    </div>
    }
    <main className="px-5 space-y-5 md:space-y-0 py-3 md:py-0">
      

      <FilterMenu   
        filterValue={filterValue}
        handleChangeFilterValue={handleChangeFilterValue}
        handleChangeSortirHarga={handleChangeSortirHarga}
        radioSelected={radioSelected}
      />
      <ListItems 
        data={data}
        radioSelected={radioSelected}
        currentPage={currentPage}
        totalPage={totalPage}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        handlePageChange={handlePageChange}
        handleClickDetailItem={handleClickDetailItem}
      />
      { isDetailItem &&
      <DetailItem
      itemDetail={itemDetail}
      handleClickCloseDetailItem={handleClickCloseDetailItem} />
      }
      <button className="fixed h-24 w-24 rounded-tr-full rounded-br-full duration-200 bottom-1/2 translate-y-1/2 -left-14 text-black flex items-center justify-center shadow-lg bg-red-500 hover:bg-red-600 md:translate-y-0 md:bottom-8 md:left-5 md:rounded-full md:hover:translate-x-0 md:hover:scale-105 hover:translate-x-14" onClick={handleClickKeranjang}>
        <ImCart className="w-10 h-10" />
      </button>
        <Keranjang
        handleClickKeranjang={handleClickKeranjang}
        isKeranjang={isKeranjang} />
    </main>
    </>
  )
}
