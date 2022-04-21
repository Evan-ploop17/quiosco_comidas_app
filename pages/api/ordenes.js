import { PrismaClient } from "@prisma/client"

export default async function handler(req, res){
    const prisma = new PrismaClient()
    console.log('peticion', req)
    if(req.method === 'POST'){
        const orden = await prisma.oden.create({
            data:{
                nombre: req.body.nombre,
                pedido: req.body.pedido,
                total: req.body.total,
                fecha: req.body.fecha,
            }
        })
        res.json(orden)
    }
}