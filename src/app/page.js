'use client'

import { useEffect, useState } from "react";
import ListItems from "./components/ListItems";
import FilterMenu from "./components/FilterMenu";
import { ImCart } from 'react-icons/im'
import DetailItem from "./components/DetailItem";
import Keranjang from "./components/Keranjang";

async function getProduct() {
  try {
    const res = await fetch(`http://localhost:5000/product`);
    const data = await res.json()
    return data;
  } catch (error) {
    return error
  }
}

async function searchProduct(filter, konsol=null) {
  try {
    const res = await fetch(`http://localhost:5000/product?q=${filter}${konsol !== null ? `&&konsol=${konsol}` : ''}`);
    const data = await res.json()
    return data;
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

  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 6
  const totalPage = Math.ceil(data.length / itemPerPage)
  const indexOfLastItem = currentPage * itemPerPage
  const indexOfFirstItem = indexOfLastItem - itemPerPage

  const [itemDetail, setItemDetail] = useState(null)

  const [isDetailBarang, setIsDetailBarang] = useState(false)

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

  const handleClickResetSearch = () => {
    setFilterValue(prev=>{
      return {
        ...prev,
      nama: '',
      }
    })
    getProduct().then(product=>setData(product))
  }

  const handleChangeSortirHarga = (selected) => {
    selected === 1 ? setRadioSelected(1) : setRadioSelected(2)
  }

  useEffect(()=>{
    getProduct().then(value=>setData(value))
  }, [])

  const handleClickDetailItem = (id) => {
    setItemDetail(data.find(product=>product.id === id))
  }

  const handleClickCloseDetailItem = () => {
    setItemDetail(null)
  }

  const handleClickKeranjang = () => {
    setIsKeranjang(prev=>!prev)
  }

  return (
    <>
    <main className="px-5 space-y-5 md:space-y-0 py-3 md:py-0">
      <FilterMenu   
        filterValue={filterValue}
        handleChangeFilterValue={handleChangeFilterValue}
        handleClickResetSearch={handleClickResetSearch}
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
      { itemDetail !== null &&
      <DetailItem
      itemDetail={itemDetail}
      handleClickCloseDetailItem={handleClickCloseDetailItem}
      setItemDetail={setItemDetail} />
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
