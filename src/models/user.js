const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      // string length validations
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      // string length validations
      minLength: 3,
      maxLength: 50,
    },
    emailId: {
      type: String,
      // validation: this field is mandatory
      required: true,
      // validation: It should contain unique mail , duplicates wont allow
      unique: true,
      lowercase: true,

      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid emailId  " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      validate: (value) => {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Paswword is invalid" + value);
        }
      },
    },
    age: {
      type: Number,
      // age validation using min and max
      min: 18,
    },
    gendar: {
      type: String,
      // Custom validation
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender is not validate");
        }
      },
    },
    skills: {
      // It takes data(String) within  the array
      type: [String],
      validate(value) {
        if (value.length > 10) {
          throw new Error("Skills should not be greater than 10");
        }
      },
    },

    photoURL: {
      type: String,
      validate: (value) => {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo url  " + value);
        }
      },
    },

    about: {
      // It is default about  validate
      type: String,
      default: "this is user default about",
    },
  },
  { timestamps: true }
);

// Method for jwt  creation
userSchema.methods.getJWT = async function () {
  // Don't write arrow function because  arrow functions  doesn't have this bhevaiour
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder123");
  return token;
};

// Method for  passwordhash(Encrypt passwords)
userSchema.methods.ValidatePassword = async function (userInputPassword) {
  const user = this;
  const passwordHash = user.password;
  const isValidPassword = await bcrypt.compare(userInputPassword, passwordHash);
  return isValidPassword;
};

module.exports = mongoose.model("user", userSchema);
