import useQuiosco from '../hooks/useQuiosco'
import Image from 'next/image'
import React from 'react'

const Categoria = ({categoria}) => {

    const {id, nombre, icono} = categoria
    const { categoriaActual, handleClickCategoria } = useQuiosco()

  return (
    <div className={`
        ${categoriaActual?.id === id ? 'bg-amber-400' : ''}
        flex items-center border p-5 gap-4 w-full hover:bg-amber-400`} >
        <Image
            width={100}
            height={100}
            src={`/assets/img/icono_${icono}.svg`}
            alt={`Imagen icono ${nombre}`}
        />
        <button
            type='button'
            className='text-2xl font-bold hovver:cursor-pointer'
            onClick={ () => handleClickCategoria(id)}
        >
            {nombre}
        </button>
    </div>
  )
}

export default Categoria