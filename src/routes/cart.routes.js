import { Router } from "express";
import daoCart from "../daos/dbManager/cart.dao.js";
import { productModel } from "../models/product.model.js";

const cartRouter = Router();
const cartDao = new daoCart();


cartRouter.get('/', async(req,res) => {
    try {
        const carts = await cartDao.getCarts();
        res.send({
            status:200,
            payload: carts,
        })        
    } catch (error) {
        res.send({
            status:400,
            payload:error
        });
    }
});

//?Agrega/crea un carrito
cartRouter.post('/', async (req,res) => {
    const newCart = await cartDao.getCreateCart(req.body)
    try {
        res.send({
            status: 200,
            payload: newCart,
        })
    } catch (error) {
        res.send({
            status:400,
            payload:error
        })
    }
});

//? Actualizacion de un carrito existente tomando como referencia su id.
cartRouter.put('/api/carts/:cid/api/products/:pid', async(req,res)=>{
    const { cid} = req.params;
    try {
        const updateCart = await cartDao.updateCart(cid, req.body)
        res.send({
            status:200,
            payload: updateCart,
        })
    } catch (error) {
        res.send({
            status:400,
            payload:error
        })
    }
});
//? Actualizacion SOLO la cantidad de ejemplares del producto en el cart
cartRouter.put('/:cid/products/:pid', async(req, res)=> {
    const {pid, cid} = req.params; 
    try {
        const updateCart = await cartDao.updateCartItemQuantity(cid, pid, req.body.quantity);
        res.send({
            status:200,
            payload: updateCart,
        })
    } catch (error) {
        res.send({
            status:400,
            payload:error
        })
    }
})
//?Elimina un carrito por ID
cartRouter.delete('/:cid', async(req,res) => {
    const {cid} = req.params;
    try {
        const deletedCart = await cartDao.deleteCart(cid, req.body);
        res.send({
            status:200,
            payload: deletedCart
        })
    } catch (error) {
        res.send({
            status:400,
            payload:error
        })
    }
});

//? Eliminar un producto especifico del cart
cartRouter.delete('/:cid/products/:pid', async(req, res)=> {
    const {cid, pid} = req.params;
    try {
        const updateCart = await cartDao.deleteCartItem(cid, pid)
        res.send({
            status: 200,
            payload: updatedCart
        });
        } catch (error) {
        res.send({
            status: 400,
            payload: error
        });
        }
    })

export default cartRouter;
