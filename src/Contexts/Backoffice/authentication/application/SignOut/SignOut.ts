import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types'
import { AuthenticationRepository } from '../../domain/AuthRepository'

@injectable()
export class SignOut {
  constructor(
    @inject(TYPES.AuthenticationApiClient)
    private authRepository: AuthenticationRepository
  ) { }

  async signOut(): Promise<boolean> {
    return await this.authRepository.signOut()
  }
}
