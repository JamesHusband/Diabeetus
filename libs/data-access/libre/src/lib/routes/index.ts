import { Router } from 'express';
import { createLibreService } from '../libre.service';
import { loginRoute } from './login';
import { termsRoute } from './terms';
import { logbookRoute } from './logbook';
import { tokenRoute } from './token';
import { connectionsRoute } from './connections';

const BASE_URL = 'https://api.libreview.io';

export const createLibreRoutes = (): Router => {
  const router = Router();
  const libreService = createLibreService({ baseUrl: BASE_URL });

  router.use(loginRoute(libreService));
  router.use(termsRoute(libreService));
  router.use(logbookRoute(libreService));
  router.use(tokenRoute(libreService));
  router.use(connectionsRoute(libreService));

  return router;
};
