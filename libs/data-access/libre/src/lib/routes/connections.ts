import { Router } from 'express';
import { LibreService } from '../types';

export const connectionsRoute = (libreService: LibreService) => {
  const router = Router();

  router.get('/connections', async (req, res) => {
    try {
      const data = await libreService.getConnections();
      res.status(200).json(data);
    } catch (error) {
      console.error('Connections error:', error);
      res.status(500).json({ error: 'Failed to fetch connections' });
    }
  });

  return router;
};
