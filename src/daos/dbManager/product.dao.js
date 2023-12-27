import { productModel } from "../../models/product.model.js";

class productDao {
    constructor() { this.model = productModel } 

    async getAllProducts({limit, page, sort, query}){
        // return await this.model.find().lean();
        try {
            const skip = (page - 1) * limit;
            const conditions = {};
            if(query){
                conditions.category = query;
            }
            const productsQuery = this.model.find(conditions).skip(skip).limit(limit)
            if(sort){
                productsQuery.sort({price:sort === 'asc' ? 1 : -1 })
            }

            //?Ejecutar la consulta en la base de datos
            const products = await productsQuery.lean();

            //?Calcular informacion de paginacion
            const totalProducts = await this.model.countDocuments(conditions);
            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return{
                products,
                totalPages,
                prevPage:hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null, 
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null, 
    
            }
        } catch (error) {
            throw error;
        }
    }
    async getProductById(id){
        return await this.model.findById(id);
    }
    async createProduct(product){
        return await this.model.create(product);
    }
    async updateProduct(id, product){
        return await this.model.findByIdAndUpdate(id, product);
    }
    async deleteProduct(id){
        return await this.model.findByIdAndDelete(id);
    }
}

export default productDao;
