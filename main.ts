import 'reflect-metadata'
import { BackendApp } from './src/apps/backend/start';
import container from './src/apps/backend/dependency-injection'

new BackendApp().start();

container
