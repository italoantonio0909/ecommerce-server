import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ProductUserInterface } from '../ui/ProductUserInterface';
import { Product, ProductPaginate } from '../../domain/Product';
import { injectable } from 'inversify';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(400).json({ error: err.message })
}

@injectable()
export class ProductWebApiUserInterface implements ProductUserInterface {
    static PORT = 8000
    api = express()

    constructor() {
        this.api.listen(ProductWebApiUserInterface.PORT, () => {
            console.log(`Catalogue listening on port ${ProductWebApiUserInterface.PORT}`)
        })
        this.api.use(bodyParser.urlencoded({ extended: false }))
        this.api.use(bodyParser.json())
        this.api.use(cors({ origin: 'http://localhost:4200' }))
    }

    installProductCreate(callback: (product: Product) => Promise<Product>): void {
        this.api.post('/api/product', async function (req: Request, res: Response, next: NextFunction) {
            try {
                const data = req.body as Product
                const product = await callback(data)
                return res.status(201).json(product);
            } catch (error) {
                next(error)
            }
        }, errorHandler)
    }

    installProductPaginate(callback: (limit: number, startAfter: number) => Promise<ProductPaginate>) {
        this.api.get('/api/products/:limit/:startAfter', async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { limit, startAfter } = req.params
                const products = await callback(parseInt(limit), parseInt(startAfter))
                return res.status(201).json(products);
            } catch (error) {
                next(error)
            }
        }, errorHandler)
    }

    installProductDetail(callback: (uid: string) => Promise<Product>) {
        this.api.get('/api/product/:uid', async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { uid } = req.params
                const product = await callback(uid)
                return res.status(201).json(product);
            } catch (error) {
                next(error)
            }
        }, errorHandler)
    }

    installProductUpdate(callback: (uid: string, product: Partial<Product>) => Promise<Product>) {
        this.api.post('/api/product/update/:uid', async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { uid } = req.params
                const data = req.body as Partial<Product>
                const product = await callback(uid, data)
                return res.status(201).json(product);
            } catch (error) {
                next(error)
            }
        }, errorHandler)
    }
}