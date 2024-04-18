const User = require("../models/users.model.js");

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).json({ message: "successfully logged out" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // const user  = new User()
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).json({ user, token });

    //  await User.findByCredentials().then((token) => {
    //    res.status(200).json(token);
    //  });
  } catch (e) {
    console.error("something going wrong ");
    res.status(500).json({ message: e.message });
  }
};

const getUsers = async (req, res) => {
  // await User.find({}).then((result) => {
  res.status(200).json(req.user);
  // });
};

const getUser = async (req, res) => {
  try {
    await User.findById(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save().then((result) => {
      res.status(200).json(result);
    });
  } catch (e) {
    console.error("something going wrong ");
    res.status(500).json({ message: e.message });
  }
};

const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body).then((result) => {
      res.status(200).json(result);
      User.findById(req.params.id).then((data) => {
        res.status(200).json(data);
      });
    });
  } catch (e) {
    console.error("something going wrong ");
    res.status(500).json({ message: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id).then(() => {
      res.status(200).json({ message: "User deleted successfully" });
    });
  } catch (e) {
    console.error("something going wrong ");
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  loginUser,
  logoutUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
};
