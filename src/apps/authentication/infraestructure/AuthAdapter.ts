import { inject, injectable } from 'inversify'
import TYPES from '../../../../container.types'
import { AuthCredential } from '../domain/AuthCredential'
import { AuthenticationUserInterface } from './AuthenticationUserInterface'
import { SignIn } from '../application/signIn/SignIn';
import { SignOut } from '../application/SignOut/SignOut';

@injectable()
export class AuthAdapter {
  constructor(
    @inject(TYPES.AuthenticationSignIn) private signIn: SignIn,
    @inject(TYPES.AuthenticationSignOut) private signOut: SignOut,
    @inject(TYPES.AuthenticationUserInterface)
    private authUserInterface: AuthenticationUserInterface
  ) { }

  init() {
    this.authUserInterface.installSignIn((credential: AuthCredential) =>
      this.signIn.signIn(credential)
    )
    this.authUserInterface.installSignOut(() => this.signOut.signOut())
  }
}
