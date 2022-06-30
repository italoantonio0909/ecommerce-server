import { injectable } from 'inversify'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { CategoryUserInterface } from '../ui/CategoryUserInterface'
import { Category } from '../../../category/domain/Category'

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
    callback: (limit: number, startAfter: number) => Promise<{ categories: Array<Category>, startAfter: number }>
  ): void {
    this.api.get(
      '/api/catalogue/category/:limit/:startAfter',
      async function (req: Request, resp: Response) {
        const { limit, startAfter } = req.params
        const result = await callback(parseInt(limit), parseInt(startAfter))
        return resp.status(200).json(result)
      }
    )
  }
  installCategoryCreate(
    callback: (category: Category) => Promise<Category>
  ): void {
    this.api.post(
      '/api/catalogue/category',
      async function (req: Request, res: Response) {
        const data = req.body as Category
        const category = await callback(data)
        return res.status(200).send(category)
      }
    )
  }
}
