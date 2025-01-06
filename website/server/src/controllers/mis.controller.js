import { asyncHandler } from '../utils/asyncHandler';
import { apiError } from '../utils/apiError';
import { apiResponse } from '../utils/apiResponse';
import mongoose from 'mongoose';

const acceptRejectData = asyncHandler(async (req, res) => {
    const { formId, userId, collectionName, status } = req.body;

    // Input validation
    if (!formId || !userId || !status || !collectionName) {
        return res.status(400).json(new apiError(400, "Missing required data fields."));
    }

    try {
        const DynamicModel = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }), collectionName);

        const result = await DynamicModel.updateOne({ formId, userId }, { $set: { status } });

        if (result.nModified === 0) {
            return res.status(404).json(new apiError(404, "No matching document found to update"));
        }

        res.status(200).json(new apiResponse(200, result, "Status updated successfully"));
    } catch (error) {
        console.error('Error in acceptRejectData:', error);
        res.status(400).json(new apiError(400, "Error updating the status of data."));
    }
});


const fetchDataByStatus = asyncHandler(async (req, res, status) => {
    const { collectionName } = req.body;

    // Input validation
    if (!collectionName) {
        return res.status(400).json(new apiError(400, "Collection Name is required."));
    }

    try {
        const DynamicModel = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }), collectionName);

        if (!DynamicModel) {
            throw new apiResponse(404, "No model was found.");
        }

        const data = await DynamicModel.find({ status });

        res.status(200).json(new apiResponse(200, data, `${status ? 'Accepted' : 'Rejected'} Data fetched successfully.`));
    } catch (error) {
        console.error(`Error in fetch${status ? 'Accepted' : 'Rejected'}Data:`, error);
        res.status(400).json(new apiError(400, `Error fetching ${status ? 'Accepted' : 'Rejected'} data.`));
    }
});


const fetchAcceptedData = asyncHandler(async (req, res) => {
    await fetchDataByStatus(req, res, true);
});


const fetchRejectedData = asyncHandler(async (req, res) => {
    await fetchDataByStatus(req, res, false);
});


export {
    acceptRejectData,
    fetchAcceptedData,
    fetchRejectedData
};
