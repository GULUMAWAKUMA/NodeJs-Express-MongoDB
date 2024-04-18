const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the user name"],
    },
    email: {
      type: String,
      required: [true, "Please enter the user email"],
      unique: [true, "This email is already taken"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter a valid email");
        }
      },
    },
    password: {
      type: String,
      required: [true, "Please enter the user password"],
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id.toString() },
    "this is my first jwt token"
    //  { expiresIn: "40s" }
  );
  // const referesh = await jwt.refresh();
  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  return token;
};
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.email;
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};
userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (err) {
    return "unable to login";
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
