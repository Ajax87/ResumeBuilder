const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please Enter valide email");
        }
      },
    },
    contactNumber: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {},
    },
    tokens: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

//auth method
userSchema.methods.generateAuthtoken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user.id.toString() }, "Cv-Service");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
  console.log(token);
};

//hasing the password before saving

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const user = mongoose.model("user", userSchema);
module.exports = user;
