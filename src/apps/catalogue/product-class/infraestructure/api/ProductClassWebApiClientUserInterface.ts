import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { injectable } from 'inversify';
import { ProductClassUserInterface } from '../ui/ProductClassUserInterface';
import { ProductClass, ProductClassPaginate } from '../../domain/ProductClass';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(400).json({ error: err.message })
}

@injectable()
export class ProductClassWebApiUserInterface implements ProductClassUserInterface {
    static PORT = 3000
    api = express()

    constructor() {
        this.api.listen(ProductClassWebApiUserInterface.PORT, () => {
            console.log(`Catalogue product class listening on port ${ProductClassWebApiUserInterface.PORT}`)
        })
        this.api.use(bodyParser.urlencoded({ extended: false }))
        this.api.use(bodyParser.json())
        this.api.use(cors({ origin: 'http://localhost:4200' }))
    }

    installProductClassCreate(callback: (product: ProductClass) => Promise<ProductClass>): void {
        this.api.post('/api/product_class', async function (req: Request, res: Response, next: NextFunction) {
            try {
                const data = req.body as ProductClass
                const productClass = await callback(data)
                return res.status(201).json(productClass);
            } catch (error) {
                next(error)
            }
        }, errorHandler)
    }

    installProductClassPaginate(callback: (limit: number, startAfter: number) => Promise<ProductClassPaginate>) {
        this.api.get('/api/products/:limit/:startAfter', async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { limit, startAfter } = req.params
                const productClass = await callback(parseInt(limit), parseInt(startAfter))
                return res.status(201).json(productClass);
            } catch (error) {
                next(error)
            }
        }, errorHandler)
    }

    installProductClassGet(callback: (limit: number, startAfter: number) => Promise<Array<ProductClass>>) {
        this.api.get('/api/products_class/:limit', async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { limit, startAfter } = req.params
                const productClass = await callback(parseInt(limit), parseInt(startAfter))
                return res.status(201).json(productClass);
            } catch (error) {
                next(error)
            }
        }, errorHandler)
    }

    installProductClassUpdate(callback: (uid: string, product: Partial<ProductClass>) => Promise<ProductClass>) {
        this.api.post('/api/product_class/update/:uid', async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { uid } = req.params
                const data = req.body as Partial<ProductClass>
                const productClass = await callback(uid, data)
                return res.status(201).json(productClass);
            } catch (error) {
                next(error)
            }
        }, errorHandler)
    }
}