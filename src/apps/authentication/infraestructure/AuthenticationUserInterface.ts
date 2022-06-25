import { AuthCredential } from '../domain/AuthCredential'

export interface AuthenticationUserInterface {
  installSinUp(callback: (credential: AuthCredential) => Promise<boolean>): void
  installSignIn(
    callback: (credential: AuthCredential) => Promise<boolean>
  ): void
  installSignOut(callback: () => Promise<boolean>): void
}
