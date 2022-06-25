import { inject, injectable } from 'inversify'
import TYPES from '../../../../container.types'
import { AuthCredential } from '../domain/AuthCredential'
import { AuthUseCases } from '../application/AuthUseCases'
import { AuthenticationUserInterface } from './AuthenticationUserInterface'

@injectable()
export class AuthAdapter {
  constructor(
    @inject(TYPES.Authentication) private AuthUseCases: AuthUseCases,
    @inject(TYPES.AuthenticationUserInterface)
    private authUserInterface: AuthenticationUserInterface
  ) {}

  init() {
    this.authUserInterface.installSignIn((credential: AuthCredential) =>
      this.AuthUseCases.signIn(credential)
    )
    this.authUserInterface.installSinUp((credential: AuthCredential) =>
      this.AuthUseCases.signUp(credential)
    )
    this.authUserInterface.installSignOut(() => this.AuthUseCases.logout())
  }
}
