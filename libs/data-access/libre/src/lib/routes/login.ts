import { Router } from 'express';
import { LibreService } from '@diabetus/shared/types';

export const loginRoute = (libreService: LibreService): Router => {
  const router = Router();

  router.post('/login', async (req, res) => {
    try {
      const response = await libreService.login(
        process.env.LIBRE_EMAIL || '',
        process.env.LIBRE_PASSWORD || ''
      );

      // Set auth token in secure cookie
      res.cookie('libre_token', response.data.authTicket.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.json(response);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  });

  return router;
};
