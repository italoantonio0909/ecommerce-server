import glob from 'glob';
import { Router } from 'express';

export function registerRoutes(router: Router) {
    const routes = glob.sync(process.cwd() + '/src/Contexts' + '/**/*Route.*');
    routes.map(route => register(route, router));
}

function register(routePath: string, app: Router) {
    const route = require(routePath);
    route.register(app);
}

