const asyncHandler = require("../utils/asyncHandler");
const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const client = require("../models/client.model");

const generateAccessAndRefreshTokens = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new apiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, "Failed to generate tokens");
  }
};

// Controller: Create New User
const createNewUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  if (!name || !surname || !email || !password || !role) {
    throw new apiError(
      400,
      "All fields (name, surname, email, password, role) are required"
    );
  }

  const validRoles = ["admin", "manager", "mis", "subadmin"];
  if (!validRoles.includes(role)) {
    throw new apiError(400, "Invalid role provided");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new apiError(409, "User with this email already exists");
  }

  const newUser = await User.create({ name, surname, email, password, role });
  res
    .status(201)
    .json(new apiResponse(201, newUser, "User Created Successfully"));
});


//controller for assigning client to mis and manager 
const assignClient = asyncHandler(async (req, res) => {
  const { misId, managerId, clientId } = req.body;

  if (!misId || !managerId || !clientId) {
    throw new apiError(400, "All fields (misId, managerId, clientId) are required");
  }

  const clientUser = await client.findById(clientId);
  if (!clientUser) {
    throw new apiError(404, "Client not found");
  }

  const user = await User.findById(misId);
  if (!user) {
    throw new apiError(404, "MIS not found");
  }

  const manager = await User.findById(managerId);
  if (!manager) {
    throw new apiError(404, "Manager not found");
  }

  clientUser.clientAssigned.push({ misId, managerId });
  // await clientId.save();

  res
    .status(200)
    .json(new apiResponse(200, clientUser, "Client assigned to MIS and Manager successfully"));
});

// Controller: Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new apiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user.email
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  console.log("Secure ? :", process.env.NODE_ENV !== "development");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "none",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

// Controller: Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new apiError(409, "User with this email already exists");
  }

  const user = await User.create({ name, surname, email, password, role });
  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new apiError(500, "Error retrieving registered user data");
  }

  res
    .status(201)
    .json(new apiResponse(201, createdUser, "User successfully registered"));
});

// Controller: Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new apiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user || incomingRefreshToken !== user.refreshToken) {
      throw new apiError(401, "Invalid refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user.email);

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new apiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new apiError(401, "Invalid refresh token");
  }
});

// Controller: Logout User
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "none",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out successfully"));
});

//Controller: Current User
const currentUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    // console.log("User: ", user);
    res
      .status(200)
      .json(new apiResponse(200, user, "Current User fetched successfully."));
  } catch (error) {
    console.log("Error while fetching current user : ", error);
    throw new apiError(500, "Problem occured during fetching current user.");
  }
});
// Controller: User Details
const userDetails = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    throw new apiError(400, "User ID not provided.");
  }

  const fetchedUser = await User.findById(id);

  if (!fetchedUser) {
    throw new apiError(404, "No user found with the given ID.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, fetchedUser, "User fetched successfully."));
});

module.exports = {
  createNewUser,
  loginUser,
  registerUser,
  assignClient,
  refreshAccessToken,
  logoutUser,
  userDetails,
  currentUser,
};
