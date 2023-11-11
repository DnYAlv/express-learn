import { type Router, type Application } from 'express'
import { HealthRouter } from './health.route'
import { ProductRouter } from './product.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/products', ProductRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
