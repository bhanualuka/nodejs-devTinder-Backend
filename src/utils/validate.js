const validateSignup = (req) => {
  const { firstName, lastName, emailId, password, photoURL, skills } = req.body;

  if (!firstName || firstName.length < 4) {
    throw new Error("Enter  Firstname");
  } else if (!lastName || lastName.length < 4) {
    throw new Error("Enter  lastname");
  } else if (!emailId) {
    throw new Error("Enter EamilId");
  }
};

const ValidateProfileEditData = (req) => {
  const ALLOWED_EDIT = ["firstName", "lastName", "age", "skills"];

  const isAllowedEdit = Object.keys(req.body).every((key) =>
    ALLOWED_EDIT.includes(key)
  );

  return isAllowedEdit;
};

module.exports = { validateSignup, ValidateProfileEditData };
