import { Router } from 'express';
import { LibreService } from '@diabetus/shared/types';

export const tokenRoute = (libreService: LibreService) => {
  const router = Router();

  router.post('/token', (req, res) => {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ error: 'Token is required' });
      }
      libreService.updateToken(token);
      res.status(200).json({ message: 'Token updated' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update token' });
    }
  });

  return router;
};
