import express from 'express'
import { authRouter } from './auth/auth.controller'
import { productsRouter } from './products/products.controller'

const app = express()

app.use(express.json())
app.use('/auth', authRouter)
app.use('/products', productsRouter)

app.listen(3000, () => {
  console.log('mercado API rodando ')
})