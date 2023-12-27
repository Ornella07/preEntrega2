
import { Router } from "express";
import productDao from "../daos/dbManager/product.dao.js";
import daoCart from "../daos/dbManager/cart.dao.js";
import messagesDao from "../daos/dbManager/message.dao.js";


const viewsRouter = Router();
const productoDao = new productDao();
// const cartsDao = new CartDao();
const messageDao = new messagesDao();


viewsRouter.get("/", async (req, res) => { //!FUNCIONA
  res.render("index", {
    productos: await productoDao.getAllProducts(),
    fileCss: 'css/style.css'
  });
});

viewsRouter.get("/messages", (req,res)=>{
  res.render("message", {
    title:'Ingreso de mensaje',
    fileCss: 'css/style.css'
  })  
})



export default viewsRouter;