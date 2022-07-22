import { BackendApp } from './src/apps/backend/start';
import container from './src/apps/backend/dependency-injection'
container

new BackendApp().start();

