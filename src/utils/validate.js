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

module.exports = { validateSignup };
