const authUtil = require("../util/auth.util");
const User = require("../models/user.model");

function getSignup(req, res) {
  res.render("customer/auth/signup", {
    title: "Sign Up",
  });
}

async function signup(req, res, next) {
  console.log(req.body);
  const newUser = new User(
    req.body.userName,
    req.body.userEmail,
    req.body.userPassword,
    req.body.userStreet,
    req.body.userPostal,
    req.body.userCity
  );
  try {
    await newUser.signup();
  } catch (error) {
    next(error);
    return 
  }

  res.redirect("/login");
}

function getLogin(res) {
  res.render('customer/auth/login');
}

async function login(req, res) {
  const user = new User(req.body.userEmail, req.body.userPassword);
  
  let existingUser;
  try {
     existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return 
  }

  if (!existingUser) {
    console.log('Failed: Not Existing User')
    res.redirect("/login");
    return;
  }

  let passwordCheck;
  try {
    passwordCheck = await user.checkMatchingPassword(existingUser.password);
  } catch (error) {
    next(error);
    return 
  }
  
  if (!passwordCheck) {
    console.log('Failed: Password Error')
    res.redirect("/login");
    return;
  }
  console.log(existingUser)
  authUtil.createUserSession(req, existingUser, function () {
    console.log('Success: Login User')
    res.redirect("/");
  });
}

function signout(req, res) {
  authUtil.destroyUserSession(req)
  res.redirect('/login')
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
  login: login,
  signout: signout
};
