import { injectable } from 'inversify'
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { CategoryUserInterface } from '../ui/CategoryUserInterface'
import { Category } from '../../../category/domain/Category'
import { Paginate } from '../../../../../Shared/pagination/domain/Paginate';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(400).json({ error: err.message })
}

@injectable()
export class CategoryApiClient implements CategoryUserInterface {
  static PORT = 8000
  api = express()

  constructor() {
    this.api.listen(CategoryApiClient.PORT, () => {
      console.log(`Catalogue listening on port ${CategoryApiClient.PORT}`)
    })
    this.api.use(bodyParser.urlencoded({ extended: false }))
    this.api.use(bodyParser.json())
    this.api.use(cors({ origin: 'http://localhost:4200' }))
  }

  installCategoryPaginate(
    callback: (limit: number, startAfter: number) => Promise<Paginate<Category>>
  ): void {
    this.api.get(
      '/api/catalogue/category/:limit/:startAfter',
      async function (req: Request, resp: Response, next: NextFunction) {
        try {
          const { limit, startAfter } = req.params
          const result = await callback(parseInt(limit), parseInt(startAfter))
          return resp.status(200).json(result)
        } catch (error) {
          next(error)
        }
      }, errorHandler
    )
  }
  installCategoryCreate(
    callback: (category: Category) => Promise<Category>
  ): void {
    this.api.post(
      '/api/catalogue/category',
      async function (req: Request, res: Response, next: NextFunction) {
        try {
          const data = req.body as Category
          const category = await callback(data)
          return res.status(200).send(category)
        } catch (error) {
          next(error)
        }
      }, errorHandler
    )
  }
}
