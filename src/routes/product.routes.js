import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";

const productosDao = new productDao();
const productRouter = Router();

productRouter.get("/", async (req, res) => { 
    try {
        const  {limit =10, page =1, sort, query }  =req.query;

        //?Logica para manjear los parametros
        const result = await productosDao.getAllProducts({
            limit,
            page,
            sort,
            query,
        });
        //? Enviar la respuesta con el formato pedido
        res.send({
            status:'success',
            payload: result.products,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink,
            nextLink: result.nextLink,
        })
    }catch(err) {
        res.send({
            status: 'error',
            payload: err
        })
    }
})

productRouter.post("/", async (req, res) => { //! FUNCIONA... YA NO
    try {
        res.send({
            status: 200,
            payload: await productosDao.createProduct(req.body)
    })}
    catch(err) {
        res.send({
            status: 400,
            payload: "No se pudo agregar"
        })
    }
})

productRouter.delete("/:id", async(req, res)=>{ //! FUNCIONA
    try{
        const productId = req.params.id;
        const result = await productosDao.deleteProduct(productId);
        res.send({
            status:200,
            playload: result
        })
    }catch(err){
        res.send({
            status: 400,
            payload: err
        })
    }
})
export default productRouter





