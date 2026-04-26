import {  Product } from '../types'

const products: Product [] = []

export class ProductService {

  create(name: string, price: number, userId: string): Product {
   if (!name || name.trim().length < 2) {
      throw new Error ('Nome deve ter ao menos 2 caracteres')
    }
      if (price <= 0 || isNaN(price)) {
        throw new Error ('Preço deve ser maior que zero')
      }

      const product: Product = {
        id: Date.now().toString(),
        name: name.trim(),
        price: Number(price.toFixed(2)),
        createdBy: userId
      }

      products.push(product)
      return product
  }
    findALL(): Product[] {
      return [...products]
    }
}