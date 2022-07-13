import { injectable } from 'inversify'
import express from 'express'
import { AuthenticationUserInterface } from '../ui/AuthenticationUserInterface'
import { AuthCredential } from '../../domain/AuthCredential'
import bodyParser from 'body-parser'

@injectable()
export class AuthenticationWebApiClientUserInterface
  implements AuthenticationUserInterface {
  static PORT = 3000
  api = express()

  constructor() {
    this.api.listen(8000, () => {
      console.log(`Authentication listening on port 8000`)
    })
    this.api.use(bodyParser.urlencoded({ extended: false }))
    this.api.use(bodyParser.json())
  }

  installSignIn(
    callback: (credential: AuthCredential) => Promise<boolean>
  ): void {
    this.api.post('/api/auth/signIn', async function (request, response) {
      const credential = request.body as AuthCredential
      const isLoggin = await callback(credential)
      return response.send(isLoggin)
    })
  }

  installSignOut(callback: () => Promise<boolean>): void {
    this.api.post('/api/auth/signOut', async function (request, response) {
      const isLogout = await callback()
      return response.send({ isLogout })
    })
  }
}
