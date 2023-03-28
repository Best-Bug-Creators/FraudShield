import Analysis from '../models/Analysis.js';

const availableStatus = ['Approved', 'Rejected'];

const statusValidation = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (!status) return res.status(400).json({ message: 'You need to pass the new status in the request body.' });
        if (!availableStatus.includes(status)) {
            return res.status(400).json({ message: 'Insert valid status' });
        }
        const analysisExists = await Analysis.findById(id);
        if (!analysisExists) {
            return res.status(404).json({ message: 'Analysis not found. Try again with a valid ID.' });
        }
        if (availableStatus.includes(analysisExists.status)) {
            return res.status(405).json({ message: `Status -${analysisExists.status}- can't be changed.` });
        } 
        return next();
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export default statusValidation;
