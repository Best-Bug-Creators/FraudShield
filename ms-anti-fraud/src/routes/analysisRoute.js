import express from 'express';
import statusValidation from '../middlewares/validateStatus.js';
import analysisController from '../controllers/analysisController.js';

const router = express.Router();

router
  .get('/analyses', analysisController.findAllAnalysis)
  .get('/analyses/under-review', analysisController.findAnalysisUnderReview)
  .get('/analyses/:id', analysisController.findAnalysisById)
  .post('/analyses', analysisController.createAnalysis)
  .patch('/analyses/:id', statusValidation, analysisController.updateAnalysis)
  .delete('/analyses/:id', analysisController.deleteAnalysis);

export default router;
