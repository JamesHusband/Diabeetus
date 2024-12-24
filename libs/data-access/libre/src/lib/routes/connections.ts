import { Router } from 'express';
import { LibreService } from '@diabetus/shared/types';

export const connectionsRoute = (libreService: LibreService) => {
  const router = Router();

  router.get('/connections', async (req, res) => {
    try {
      // Get token from cookie
      const token = req.cookies.libre_token;
      if (!token) {
        return res.status(401).json({ error: 'No auth token found' });
      }

      // Update the service with the token
      libreService.updateToken(token);

      const data = await libreService.getConnections();
      res.status(200).json(data);
    } catch (error) {
      console.error('Connections error:', error);
      res.status(500).json({ error: 'Failed to fetch connections' });
    }
  });

  return router;
};
