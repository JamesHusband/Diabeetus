import { Router } from 'express';
import { LibreService } from '@diabetus/shared/types';

export const termsRoute = (libreService: LibreService) => {
  const router = Router();

  router.post('/terms', async (req, res) => {
    try {
      await libreService.acceptTerms();
      res.status(200).json({ message: 'Terms accepted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to accept terms' });
    }
  });

  router.post('/privacy', async (req, res) => {
    try {
      await libreService.acceptPrivacyPolicy();
      res.status(200).json({ message: 'Privacy policy accepted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to accept privacy policy' });
    }
  });

  return router;
};
