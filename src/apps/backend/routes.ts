import glob from 'glob';
import { Router } from 'express';

export function registerRoutes(router: Router) {
    console.log(process.cwd() + '/src/Context')
    const routes = glob.sync(process.cwd() + '/src/Contexts' + '/**/*.route.*');
    routes.map(route => register(route, router));
}

function register(routePath: string, app: Router) {
    const route = require(routePath);
    route.register(app);
}

