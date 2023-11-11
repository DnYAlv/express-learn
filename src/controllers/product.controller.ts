import { type Request, type Response } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { addProductToDB, getProductById, getProductFromDB } from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'
// import type ProductType from '../types/product.type'

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  if (id) {
    const product = await getProductById(id)
    if (product) {
      logger.info('Success Get Product Data')
      return res.status(200).send({ status: true, statusCode: 200, data: product })
    } else {
      logger.info('Product not found')
      return res.status(404).send({ status: false, statusCode: 404, message: 'Data Not Found', data: {} })
    }
  } else {
    const products: any = await getProductFromDB()
    logger.info('Success Get Product Data')
    return res.status(200).send({ status: true, statusCode: 200, data: products })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  logger.info('Adding new product...')
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('ERR: product - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }
  try {
    await addProductToDB(value)
    res.status(201).send({ status: true, statusCode: 201, message: 'Add Product Success', data: value })
    logger.info('Success added new product')
  } catch (error) {
    logger.error('ERR: product - create = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}
