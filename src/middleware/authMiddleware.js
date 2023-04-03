const jwt = require('jsonwebtoken');

exports.authenticateUser = function (req, res, next) {
  try {
      const headerToken = req.headers['authorization']
      if (typeof headerToken == 'undefined' || typeof headerToken == 'null') {
          return res.status(400).send({ status: false, msg: "Please Provide Token" })
      }

      let Token = headerToken.split(" ").pop()
     jwt.verify(Token, "groot",(error,decoded)=>{
           if (error) {
          return res.status(401).send({ status: false, message: error.message });
      } else {
          req.userId = decoded.userId
          console.log(req.userId)
          next()
      }
      })
     
  } catch (err) {
      return res.status(500).send({ status: false, msg: err.message })
  }
}
