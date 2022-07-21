import { Router } from 'express';

export const register = (router: Router) => {
    router.get('/status', (req: any, res: any) => res.json({ ok: 2000 }));
};
