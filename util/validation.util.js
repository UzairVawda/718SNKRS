function isEmpty(content) {
  return !content || content.trim() === "";
}

function userCredCheck(email, password) {
  return (
    email && email.includes("@") && password && password.trim().length >= 8
  );
}

function userDetailsValid(email, password, name, street, postal, city) {
  return (
    userCredCheck(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function checkBothEmails(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  userDetailsValid: userDetailsValid,
  checkBothEmails: checkBothEmails,
};
