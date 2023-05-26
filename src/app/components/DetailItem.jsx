import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateKeranjang } from '../redux/features/keranjangSlice'

const DetailItem = ({ itemDetail, handleClickCloseDetailItem }) => {

    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()

    const keranjangBelanja = useSelector(state=>state.keranjang)
    const dispatch = useDispatch()

    const [jumlahPesan, setJumlahPesan] = useState(1)
    const [totalBayar, setTotalBayar] = useState(itemDetail.harga * 1)
    const [order, setOrder] = useState(keranjangBelanja)
    const [isComplete, setIsComplete] = useState(false)

    const lastId = keranjangBelanja?.reduce((_, obj)=>Math.max(obj.idBelanja), 0)
    
    const handleClickJumlahOrder = (aksi) => {
        if(aksi === 'tambah'){
            setJumlahPesan(prev=>prev < itemDetail.stock ? prev + 1 : itemDetail.stock )
        } else {
            setJumlahPesan(prev=>prev > 2 ? prev - 1 : 1)
        }
    }
    
    useEffect(()=>{
        setTotalBayar(itemDetail.harga * jumlahPesan)
    }, [jumlahPesan])

    
    const handleClickOrder = () => {
        setOrder((prev=>{
            return [
                ...prev, {
                idBelanja: lastId + 1,
                namaBarang: itemDetail.nama,
                jumlahBeli: jumlahPesan,
                totalBayar: totalBayar,
                tglBeli: `${day}-${month}-${year}`,
                fotoBarang: itemDetail.foto
            }]
        }))
        setIsComplete(prev=>!prev)
           
    }

    useEffect(()=>{
        dispatch(updateKeranjang(order))
    }, [order])

    useEffect(()=>{
        setIsComplete(false)
    }, [])

    console.log(order)

  return (
    <>
    <button className='w-screen h-[110vh] bg-black -top-10 left-0 fixed bg-opacity-60 z-10 md:h-screen md:top-0' onClick={handleClickCloseDetailItem}></button>
    <div className='fixed w-full md:w-[30rem] h-fit border rounded-lg bg-slate-200 z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 space-y-2'>
        <div className='shadow-inner flex flex-col bg-white items-center p-3 rounded-lg border-gray-600 md:flex-row'>
            <Image src={itemDetail.foto} alt='foto' width={200} height={230} className='object-center object-cover' />
            <div>
                <p className='text-2xl'>{itemDetail?.nama}</p>
                <p className='font-semibold text-lg'>{itemDetail?.harga.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
                <p>{itemDetail?.keterangan}</p>
                <p>Stok tersisa <span className='font-semibold text-lg'>{itemDetail?.stock}</span></p>
                <p>Kondisi {itemDetail?.condition}</p>
            </div>
        </div>
        <h3 className='text-center font-semibold'>Pemesanan</h3>
        <div className='w-full h-fit py-2 px-4 rounded-lg flex items-center justify-center gap-10 bg-white'>
            <button className=' bg-green-400 p-2' onClick={()=>handleClickJumlahOrder('kurang')}><AiOutlineMinus className='w-6 h-6' /></button>
            <p className='text-lg'>{jumlahPesan}</p>
            <button className='bg-green-400 p-2' onClick={()=>handleClickJumlahOrder('tambah')}><AiOutlinePlus className='w-6 h-6' /></button>
        </div>
        <h3 className='text-center font-semibold'>Total</h3>
        <div className='w-full h-fit py-2 px-4 rounded-lg bg-white'>
            <p className='font-semibold text-2xl text-center'>{(totalBayar).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
        </div>
        <button className='w-full h-12 bg-green-400 hover:bg-green-500 active:bg-green-600 text-lg' onClick={handleClickOrder}>Order</button>
    </div>
    {   isComplete &&
        <>
        <button className='w-screen h-[110vh] bg-black -top-10 left-0 fixed z-20 bg-opacity-70' onClick={handleClickCloseDetailItem}></button>    
        <div className='w-fit h-fit fixed p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-30 flex flex-col items-center justify-center text-center rounded-lg'>
        <p>Data telah ditambahkah</p>
        <button className='rounded-lg p-5 shadow-md bg-green-500 hover:bg-green-600 active:bg-green-700' onClick={handleClickCloseDetailItem}>OK</button>
    </div>
    </>
    }
    </>
  )
}

export default DetailItem