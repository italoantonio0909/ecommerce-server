import { AuthCredential } from '../domain/AuthCredential'

export interface AuthenticationRepository {
  signUp(credential: AuthCredential): Promise<any>
  signIn(credential: AuthCredential): Promise<any>
  signOut(): Promise<any>
}
