import { Router, Request, Response } from 'express'
import { ProductService } from './products.services'
import { jwtGuard } from '../jwt.guard'

export const productsRouter = Router ()
const productsService = new ProductService()

productsRouter.get('/', (req: Request, res: Response) => {
  const products = productsService.findALL()
  res.json(products)
})

productsRouter.post('/', jwtGuard, async (req: Request, res: Response) => {
  try {
    const {name,price} = req.body

    if (!name || !price) {
      return res.status(400).json({ error: 'Informe nome e preço' })
    }

    const userId = (req as any).user.userId

    const product = productsService.create(name, Number(price), userId)

    res.status(201).json(product)
  
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})