import { Router, Request, Response } from 'express';

export const register = (router: Router) => {
  router.get('/courses', (req: any, res: any) => res.json({ ok: 200 }));
};
