import { Router } from 'express';
import { LibreService } from '@diabetus/shared/types';

export const loginRoute = (libreService: LibreService): Router => {
  const router = Router();

  router.post('/login', async (req, res) => {
    try {
      if (!process.env.LIBRE_EMAIL || !process.env.LIBRE_PASSWORD) {
        throw new Error('Missing Libre credentials in environment variables');
      }

      const response = await libreService.login(
        process.env.LIBRE_EMAIL,
        process.env.LIBRE_PASSWORD
      );

      if (!response.data?.authTicket?.token) {
        throw new Error('No auth token received from Libre API');
      }

      // Set auth token in secure cookie
      res.cookie('libre_token', response.data.authTicket.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      // Only return the auth ticket data
      res.json({ data: { authTicket: response.data.authTicket } });
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to login' });
      }
    }
  });

  return router;
};
