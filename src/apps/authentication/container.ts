import { Container } from 'inversify'
import TYPES from '../../../container.types'
import { AuthenticationWebApiClientUserInterface } from './infraestructure/AuthenticationWebApi'
import { AuthenticationWebApiClient } from './infraestructure/AuthenticationWebApiClient'
import { AuthAdapter } from './infraestructure/AuthAdapter'
import { SignIn } from './application/signIn/SignIn';
import { SignOut } from './application/SignOut/SignOut';

export const container = new Container()
container.bind(TYPES.AuthenticationSignIn).to(SignIn);
container.bind(TYPES.AuthenticationSignOut).to(SignOut);
container.bind(TYPES.AuthenticationUserInterface).to(AuthenticationWebApiClientUserInterface);
container.bind(TYPES.AuthenticationApiClient).to(AuthenticationWebApiClient).inSingletonScope();
container.bind(TYPES.AuthenticationAdapter).to(AuthAdapter);
container.get<AuthAdapter>(TYPES.AuthenticationAdapter).init();