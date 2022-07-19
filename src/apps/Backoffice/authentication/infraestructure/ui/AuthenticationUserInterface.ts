import { AuthCredential } from '../../domain/AuthCredential'

export interface AuthenticationUserInterface {
  installSignIn(callback: (credential: AuthCredential) => Promise<boolean>): void
  installSignOut(callback: () => Promise<boolean>): void
}
