import {useState, useEffect, createContext} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from "next/router";

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const obtenerCategorias = async () => {
        const {data} = await axios('/api/categorias')
        setCategorias(data)
    }
    
    useEffect( () => {
        obtenerCategorias()
    }, [] )

    useEffect( () =>{
        setCategoriaActual(categorias[0])
    }, [categorias] )

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id )
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    // usamos así los parametros para sacar la imagen y la categoria ya que no lo necesitamos 
    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if(pedido.some(productoState => productoState.id === producto.id)){
            const pedidoActualizado = pedido.map( productoState => productoState.id === producto.id ? producto : productoState )
            setPedido(pedidoActualizado)
            toast.success(`Guardado correctamente: ${producto.nombre}`)
        }
        else{
            setPedido([...pedido, producto])
            toast.success(`Agregado al pedido: ${producto.nombre}`)
        }
        setModal(false)
    }

    const handleEditarCantidades = id => {
        const productoActualziar = pedido.filter( producto => producto.id === id )
        setProducto(productoActualziar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id )
        setPedido(pedidoActualizado)
    }

    const colocarOden = async  e => {
        e.preventDefault()
        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha : Date.now().toString()})

            toast.success(`Pedido de ${nombre} realizado correctamente`)

            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            setTimeout(() => {
                router.push('/')
            }, 3000);

        } catch (error) {
            console.log('error', error)
        }
    }

  return (
    <QuioscoContext.Provider
        value={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            producto,
            setProducto,
            modal,
            handleChangeModal,
            pedido,
            handleAgregarPedido,
            handleEditarCantidades,
            handleEliminarProducto,
            nombre,
            setNombre,
            colocarOden, 
            total
        }}
    >
        {children}
    </QuioscoContext.Provider>
  )
}

export {
    QuioscoProvider
}
export default QuioscoContext