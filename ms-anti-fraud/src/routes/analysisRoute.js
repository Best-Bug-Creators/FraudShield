import express from 'express';
import statusValidation from '../middlewares/validateStatus.js';
import analysisController from '../controllers/analysisController.js';

const router = express.Router();

router
  .get('/analysis', analysisController.findAllAnalysis)
  .get('/analysis/:id', analysisController.findAnalysisById)
  .get('/analysis/under-review', analysisController.findAnalysisUnderReview)
  .post('/analysis', analysisController.createAnalysis)
  .patch('/analysis/:id', statusValidation, analysisController.updateAnalysis)
  .delete('/analysis/:id', analysisController.deleteAnalysis);

export default router;
