import { User } from "../models/user.model.js";

// CREATE - register a new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password, avatar, bio } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email and password are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this username or email already exists" });
    }

    const user = await User.create({ username, email, password, avatar, bio });

    // never send the password back
    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// READ - get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// READ - get a single user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE - update a user by id
export const updateUser = async (req, res) => {
  try {
    const { username, email, avatar, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, avatar, bio },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE - delete a user by id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
