import { Container } from 'inversify'
import TYPES from '../../../container.types'
import { AuthenticationWebApiClientUserInterface } from './infraestructure/AuthenticationWebApi'
import { AuthUseCases } from './application/AuthUseCases'
import { AuthenticationWebApiClient } from './infraestructure/AuthenticationWebApiClient'
import { AuthAdapter } from './infraestructure/AuthAdapter'
export const container = new Container()

container.bind(TYPES.Authentication).to(AuthUseCases)
container
  .bind(TYPES.AuthenticationUserInterface)
  .to(AuthenticationWebApiClientUserInterface)
container.bind(TYPES.AuthenticationApiClient).to(AuthenticationWebApiClient)
container.bind(TYPES.AuthenticationAdapter).to(AuthAdapter)
