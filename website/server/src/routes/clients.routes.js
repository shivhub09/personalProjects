const asyncHandler = require("../utils/asyncHandler");
const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const User = require("../models/user.model"); // Ensure this matches your export
const jwt = require('jsonwebtoken');
const Client = require("../models/client.model");


