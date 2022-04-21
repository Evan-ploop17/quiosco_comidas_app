import ResumenProductos from "../components/ResumenProductos";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

export default function Resumen(){
    const {pedido} = useQuiosco()
    return(
        <Layout
            pagina='Resumen'
        >
            <h1 className="text-4xl font-black" > Resumen </h1>
            <p className="text-2xl my-10" > Revisa tú pedido </p>
            {
                pedido.length === 0 ? (
                    <p 
                        className="text-2xl font-bold text-center text-amber-500" >
                        No hay elementos en tu pedido
                    </p> 
                ) :
                (
                    pedido.map( producto => {
                        return <ResumenProductos
                            key={producto.id}
                            producto={producto}
                        />
                     } )
                )
            }
        </Layout>
    )
}