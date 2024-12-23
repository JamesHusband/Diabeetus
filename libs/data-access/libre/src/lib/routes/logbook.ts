import { Router } from 'express';
import { LibreService } from '@diabetus/shared/types';

export const logbookRoute = (libreService: LibreService) => {
  const router = Router();

  router.get('/logbook', async (req, res) => {
    try {
      const data = await libreService.getLogbook();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  return router;
};
