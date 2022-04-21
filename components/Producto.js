import Image from 'next/image'
import React from 'react'
import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

const Producto = ({producto}) => {

    const { setProducto, handleChangeModal } = useQuiosco()
    const {nombre, imagen, precio} = producto

  return (
    <div className='border p-3 grid'>
        <Image
            src={`/assets/img/${imagen}.jpg`}
            alt={`Imagen Platillo ${nombre}`}
            width={400}
            height={500}
        />
        <div className='p-1 md:p-3' >
            <h3 className='text-xl sm:text-3xl lg:text-4xlfont-bold' >{nombre}</h3>
            <p className='mt-5 font-black text-2xl sm:text-3xl lg:text-4xl text-amber-500 ' >
                {formatearDinero(precio)}
            </p>
        </div>
        <button
            type='button'
            className='bg-indigo-600 hover:bg-indigo-800 w-full mt-5 p-3 uppercase font-bold text-white'
            onClick={ () => {
                setProducto(producto)
                handleChangeModal()
            }}
        >
            Agregar
        </button>
    </div>
  )
}

export default Producto