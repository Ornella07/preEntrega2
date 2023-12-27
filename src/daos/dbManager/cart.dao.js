import { cartModel } from "../../models/cart.model.js";

class cartDao {
    constructor() { this.model = cartModel }
    //!obtengo todos los productos
    async getCarts(){
        return await this.model.find().lean();
    }
    //!Creo un carrito
    async getCreateCart(cart){
        return await this.model.create(cart);
    }
    //!Obtengo un carrtio especifico
    async getCartById(id){
        return await this.model.findById(id);
    }
    //! Actualizo un carrito existente, tomando su ID...
    async updateCart(id, cart){
        //?Uso de populate para obetener productos completos
        try{
            const updateCart = await this.model.findByIdAndUpdate(id, cart)
            .populate({
                path: 'products.product',
                model:'products'
            })
            return updateCart;
        }catch(error){
            throw error;
        }
    }
    //!Elimino un carrito por ID
    async deleteCart(id){
        return await this.model.findByIdAndDelete(id);
    }
}



export default cartDao;