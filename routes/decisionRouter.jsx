import { Router } from 'express';
import { decisionController } from '../controllers/decisionController';

const dislikedMealRouter = Router();
const { createDecision, getDecision } = decisionController();

// Definir las rutas con los tipos adecuados
dislikedMealRouter.route('/events/:eventId/decision')
    .post(createDecision)
    .get(getDecision);

export default dislikedMealRouter;
