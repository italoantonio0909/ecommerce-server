import { inject, injectable } from 'inversify'
import TYPES from '../../../../container.types'
import { AuthCredential } from '../domain/AuthCredential'
import { AuthenticationRepository } from '../domain/AuthRepository'

@injectable()
export class AuthUseCases {
  constructor(
    @inject(TYPES.AuthenticationApiClient)
    private authRepository: AuthenticationRepository
  ) {}

  async signIn(credential: AuthCredential): Promise<boolean> {
    return await this.authRepository.signIn(credential)
  }

  async signUp(credential: AuthCredential): Promise<boolean> {
    return await this.authRepository.signUp(credential)
  }

  async logout(): Promise<boolean> {
    return await this.authRepository.signOut()
  }
}
