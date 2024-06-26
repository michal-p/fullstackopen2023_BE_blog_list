const jwt = require('jsonwebtoken')

const isStrongPassword = (password) => {
  const lowercaseRegex = /[a-z]/
  const uppercaseRegex = /[A-Z]/
  const digitRegex = /[0-9]/
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
  if (password === undefined) {
    return {
      status: false,
      message: 'Password is missing'
    }
  }

  if (password.length < 3 ||
    !lowercaseRegex.test(password) ||
    !uppercaseRegex.test(password) ||
    !digitRegex.test(password) ||
    !specialCharRegex.test(password)) {

    return {
      status: false,
      message: 'Password must be at least 3 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'
    }
  }

  return {
    status: true,
    message: 'Password is strong.'
  }
}

const createToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user.id
  }
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 }// token expires in 60*60 seconds, that is, in one hour
    //The other solution is to save info about each token to the backend database and to check for each API request if the access rights corresponding to the tokens are still valid. With this scheme, access rights can be revoked at any time. This kind of solution is often called a server-side session.
  )

  return token
}

module.exports = {
  isStrongPassword,
  createToken
}