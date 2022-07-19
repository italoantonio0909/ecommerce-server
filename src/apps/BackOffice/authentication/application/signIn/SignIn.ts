import { inject, injectable } from 'inversify'
import TYPES from '../../../../../../container.types';
import { AuthenticationRepository } from '../../domain/AuthRepository';
import { AuthCredential } from '../../domain/AuthCredential';

@injectable()
export class SignIn {
  constructor(
    @inject(TYPES.AuthenticationApiClient)
    private authRepository: AuthenticationRepository
  ) { }

  async signIn(credential: AuthCredential): Promise<boolean> {
    return await this.authRepository.signIn(credential)
  }
}
