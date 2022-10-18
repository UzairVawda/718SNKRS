const authUtil = require("../util/auth.util");
const validUtil = require("../util/validation.util");
const sessionUtil = require("../util/sessionFlash.util");
const User = require("../models/user.model");

function getSignup(req, res) {
  let sessionData = sessionUtil.fromSession(req)
  if (!sessionData) {
    sessionData = { 
      email: '',
      confrimEmail: '',
      password: '',
      name: '',
      street: '',
      postal: '',
      city: '',
    }
  }
  res.render("customer/auth/signup", {
    title: "Sign Up",
    data: sessionData
  });
}

async function signup(req, res, next) {
  const enteredData = {
    email: req.body.userEmail,
    confrimEmail: req.body.userConfrimEmail,
    password: req.body.userPassword,
    name: req.body.userName,
    street: req.body.userStreet,
    postal: req.body.userPostal,
    city: req.body.userCity,
  };
  if (
    !validUtil.userDetailsValid(
      req.body.userEmail,
      req.body.userPassword,
      req.body.userName,
      req.body.userStreet,
      req.body.userPostal,
      req.body.userCity
    ) ||
    !validUtil.checkBothEmails(req.body.userEmail, req.body.userConfrimEmail)
  ) {
    sessionUtil.toSession(
      req,
      {
        error: "Please check Input Values!",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }
  const newUser = new User(
    req.body.userEmail,
    req.body.userPassword,
    req.body.userName,
    req.body.userStreet,
    req.body.userPostal,
    req.body.userCity
  );

  try {
    const exisitngUser = await newUser.exisitsAlready();
    if (exisitngUser) {
      sessionUtil.toSession(
        req,
        {
          error: "Email already Exisit!",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }
    await newUser.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = sessionUtil.fromSession(req)
  if (!sessionData) {
    sessionData = { 
      email: '',
      password: ''
    }
  }
  res.render("customer/auth/login", {
    title: "Login",
    data: sessionData
  });
}

async function login(req, res) {
  const enteredData = {
    email: req.body.userEmail,
    password: req.body.userPassword,
  };
  const user = new User(req.body.userEmail, req.body.userPassword);

  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    sessionUtil.toSession(
      req,
      {
        error:
          "Failed to find user! Please check the entered email and password.",
        ...enteredData,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  let passwordCheck;
  try {
    passwordCheck = await user.checkMatchingPassword(existingUser.password);
  } catch (error) {
    next(error);
    return;
  }

  if (!passwordCheck) {
    sessionUtil.toSession(
      req,
      {
        error:
          "Failed to find user! Please check the entered email and password.",
        ...enteredData,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }
  console.log(existingUser);
  authUtil.createUserSession(req, existingUser, function () {
    console.log("Success: Login User");
    res.redirect("/");
  });
}

function signout(req, res) {
  authUtil.destroyUserSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
  login: login,
  signout: signout,
};
