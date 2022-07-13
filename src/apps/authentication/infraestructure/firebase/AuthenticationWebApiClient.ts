import dotenv from 'dotenv'
import { injectable } from 'inversify'
import { applicationDefault } from 'firebase-admin/app'
import { getAuth, Auth } from 'firebase-admin/auth'
import { AuthCredential } from '../../domain/AuthCredential'
import { AuthenticationRepository } from '../../domain/AuthRepository'

dotenv.config()
@injectable()
export class AuthenticationWebApiClient implements AuthenticationRepository {
  auth: Auth

  constructor() {
    const admin = require('firebase-admin')

    admin.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.GOOGLE_APPLICATION_DATABASE,
    })

    this.auth = getAuth()
  }

  async signIn({ email, password }: AuthCredential): Promise<any> {
    const user = getAuth
    console.log(user)
  }

  async signOut(): Promise<boolean> {
    return await true
  }
}
