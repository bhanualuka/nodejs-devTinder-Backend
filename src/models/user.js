const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 24,
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
    },
    about: {
      // It is default about  validate
      type: String,
      default: "this is user default about",
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("user", userSchema);
