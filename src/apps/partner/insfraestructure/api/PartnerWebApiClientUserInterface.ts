import { injectable } from 'inversify'
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { PartnerUserInterface } from '../ui/PartnerUserInterface';
import { Partner, StockRecord } from '../../domain/Partner';
import { PartnerPaginate, StockRecordPaginate } from '../../domain/PartnerRepository';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(400).json({ error: err.message })
}

@injectable()
export class PartnerWebApiClientUserInterface
    implements PartnerUserInterface {
    static PORT = 3000
    api = express()

    constructor() {
        this.api.listen(PartnerWebApiClientUserInterface.PORT, () => {
            console.log(`Partner listening on port ${PartnerWebApiClientUserInterface.PORT}`)
        })
        this.api.use(bodyParser.urlencoded({ extended: false }))
        this.api.use(bodyParser.json())
        this.api.use(cors({ origin: 'http://localhost:4200' }))
    }

    installPartnerCreate(
        callback: (partner: Partner) => Promise<Partner>
    ): void {
        this.api.post(
            '/api/partner',
            async function (req: Request, resp: Response, next: NextFunction) {
                try {
                    const partner = req.body as Partner;
                    const partnerData = await callback(partner);
                    return resp.status(200).send(partnerData)
                } catch (error) {
                    next(error)
                }
            }
        ), errorHandler
    }

    installPartnerPaginate(
        callback: (limit: number, startAfter: number) => Promise<PartnerPaginate>
    ): void {
        this.api.get(
            '/api/partners/:limit/:startAfter',
            async function (req: Request, resp: Response, next: NextFunction) {
                try {
                    const { limit, startAfter } = req.params;
                    const partners = await callback(parseInt(limit), parseInt(startAfter))
                    return resp.status(200).json(partners)
                } catch (error) {
                    next(error)
                }
            }, errorHandler
        )
    }

    installStockRecordCreate(
        callback: (stockRecord: StockRecord) => Promise<StockRecord>
    ): void {
        this.api.post(
            '/api/stockRecord',
            async function (req: Request, resp: Response, next: NextFunction) {
                try {
                    const stockRecord = req.body as StockRecord;
                    const stockRecordCreated = await callback(stockRecord);
                    return resp.status(201).send(stockRecordCreated)
                } catch (error) {
                    next(error)
                }
            }
        ), errorHandler
    }

    installStockRecordUpdate(
        callback: (uid: string, stockRecord: Partial<StockRecord>) => Promise<StockRecord>
    ): void {
        this.api.put(
            '/api/stockRecord/:uid',
            async function (req: Request, resp: Response, next: NextFunction) {
                try {
                    const { uid } = req.params;
                    const stockRecord = req.body as StockRecord;
                    const stockRecordCreated = await callback(uid, stockRecord);
                    return resp.status(201).send(stockRecordCreated)
                } catch (error) {
                    next(error)
                }
            }
        ), errorHandler
    }

    installStockRecordPaginate(
        callback: (limit: number, startAfter: number) => Promise<StockRecordPaginate>
    ): void {
        this.api.get(
            '/api/stockRecord/:limit/:startAfter',
            async function (req: Request, resp: Response, next: NextFunction) {
                try {
                    const { limit, startAfter } = req.params;
                    const stockRecord = await callback(parseInt(limit), parseInt(startAfter))
                    return resp.status(200).send(stockRecord)
                } catch (error) {
                    next(error)
                }
            }, errorHandler
        )
    }
}
