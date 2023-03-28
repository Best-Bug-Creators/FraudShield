import express from 'express';
import analysisController from '../controllers/analysisController.js';

const router = express.Router();

router
  .get('/analysis', analysisController.findAllAnalysis)
  .get('/analysis/:id', analysisController.findAnalysisById)
  .post('/analysis', analysisController.createAnalysis)
  .put('/analysis/:id', analysisController.updateAnalysis)
  .delete('/analysis/:id', analysisController.deleteAnalysis);

export default router;
