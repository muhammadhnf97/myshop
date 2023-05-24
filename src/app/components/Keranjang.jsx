import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

const Keranjang = ({ handleClickKeranjang, isKeranjang }) => {

    const keranjangBelanja = useSelector(state => state.keranjang)

  return (
    <>
    <button className={`h-[110vh] w-screen bg-black fixed -top-10 left-0 bg-opacity-50 ${isKeranjang ? 'transition-transform visible' : 'invisible'}`} onClick={handleClickKeranjang}></button>

    <div className={`bg-red-400 shadow-md w-[95vw] h-[60vh] fixed left-1/2 -translate-x-1/2 rounded-tl-lg rounded-tr-lg p-5 overflow-scroll duration-150 space-y-2 ${isKeranjang ? '-bottom-20 transition-transform -translate-y-10 visible' : ' invisible'} md:h-[70vh]  `}>
        <h3 className='text-xl font-semibold text-center'>Keranjang Belanja</h3>
        <div className='space-y-3 md:grid md:grid-cols-3 md:justify-center md:space-y-0 md:gap-3'>
            {
                keranjangBelanja.length < 1 ? <p> Keranjang Belanja Belum Ada</p> :
                keranjangBelanja.map(product=>(
                    <div key={product.idbelanja} className='p-3 rounded-lg bg-white shadow-md flex md:h-40 md:gap-4'>
                        <Image src={product.fotoBarang} alt='foto' width={100} height={70} loading='lazy' className='object-center object-cover' />
                        <div className='space-y-1 md:h-40'>
                            <p>{product.tglBeli}</p>
                            <p className='font-semibold text-xl'>{product.namaBarang}</p>
                            <p className='myclass'>{product.totalBayar.toLocaleString('id-ID', { style: 'currency', currency: 'IDR'})}</p>
                            <p>{product.jumlahBeli} Unit</p>
                        </div>
                    </div>
                ))
            }

        </div>
    </div>
    </>
  )
}

export default Keranjang