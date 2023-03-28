import Analysis from '../models/Analysis.js';

class analysisController {
  static findAllAnalysis = (_req, res) => {
    Analysis.find((_err, allAnalysis) => res.status(200).json(allAnalysis));
  };

  static findAnalysisById = (req, res) => {
    const { id } = req.params;
    Analysis.findById(id, (err, analysis) => {
      if (err) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(200).json(analysis);
      }
    });
  };

  static findAnalysisUnderReview = (_req, res) => {
    Analysis.find({ status: 'Under review' }, (err, analysis) => {
      if (err) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(200).json(analysis);
      }
    });
  };

  static createAnalysis = (req, res) => {
    const infoAnalysis = { ...req.body, status: 'Under review' };
    const analysis = new Analysis(infoAnalysis);
    analysis.save((err) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(201).json(analysis);
      }
    });
  };

  static updateAnalysis = (req, res) => {
    const { id } = req.params;
    Analysis.findByIdAndUpdate(id, { $set: req.body }, { new: true }, (err, analysis) => {
      if (err) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(200).json(analysis);
      }
    });
  };

  static deleteAnalysis = (req, res) => {
    const { id } = req.params;
    Analysis.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(204).send({ message: 'Analysis deleted successfully.' });
      }
    });
  };
}

export default analysisController;
