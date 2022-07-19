import { AuthCredential } from './AuthCredential'

export interface AuthenticationRepository {
  signIn(credential: AuthCredential): Promise<any>
  signOut(): Promise<any>
}
