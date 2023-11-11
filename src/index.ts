import express, { type Application, type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app: Application = express()
const port: number = parseInt(process.env.PORT ?? '4000')

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: '200', data: 'Hello World' })
})

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`)
})
