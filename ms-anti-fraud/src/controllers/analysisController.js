import axios from 'axios';
import Analysis from '../models/Analysis.js';

class analysisController {
  static findAllAnalysis = async (_req, res) => {
    try {
      const allAnalysis = await Analysis.find();
      res.status(200).json(allAnalysis);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static findAnalysisById = async (req, res) => {
    try {
      const { id } = req.params;
      const analysis = await Analysis.findById(id);
      if (!analysis) {
        res.status(404).send({ message: 'Analysis not found' });
      } else {
        const customer = await axios.get(`localhost:3002/customers/invoiceExp/${analysis.clientId}`);
        const { value } = await axios.get(`localhost:3003/transactions/${analysis.transactionId}`);
        const detailedAnalysis = {
          // eslint-disable-next-line no-underscore-dangle
          analysisId: analysis._id,
          analysisStatus: analysis.status,
          clientId: analysis.clientId,
          clientData: {
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            monthlyIncome: customer.monthlyIncome,
            invoiceExpirationDate: customer.invoiceExpirationDate,
          },
          transactionId: analysis.transactionId,
          transactionAmount: value,
        };
        res.status(200).json(detailedAnalysis);
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static findAnalysisUnderReview = async (_req, res) => {
    try {
      const analysis = await Analysis.find({ status: 'Under review' });
      res.status(200).json(analysis);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static createAnalysis = async (req, res) => {
    try {
      const infoAnalysis = { ...req.body, status: 'Under review' };
      const analysis = new Analysis(infoAnalysis);
      await analysis.save();
      res.status(201).json(analysis);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static updateAnalysis = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedAnalysis = await Analysis.findByIdAndUpdate(
        id,
        { $set: { status } },
        { new: true },
      );

      await axios.patch(`localhost:3003/transactions/${updatedAnalysis.transactionId}`, { status });

      if (!updatedAnalysis) {
        res.status(404).send({ message: 'Analysis not found' });
      } else {
        res.status(200).json(updatedAnalysis);
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  static deleteAnalysis = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAnalysis = await Analysis.findByIdAndDelete(id);
      if (!deletedAnalysis) {
        res.status(404).send({ message: 'Analysis not found' });
      } else {
        res.status(204).send({ message: 'Analysis deleted successfully.' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default analysisController;
