const jwt = require('jsonwebtoken')

const generateTokens =async (user) => {
    const accessTokenSecret ="33a469b7259978306279cdccd9a0c4cdd46fa4c74c6c9dce97c83af4235506fe"
    const refreshTokenSecret ="33a469b7259978306279cdccd9a0c4cdd46fa4c74c6c9dce97c83af4235506fe"
    const accessToken = jwt.sign(
        { id: user._id, email: user.email_id },
        accessTokenSecret,
        { expiresIn: "10m" } 
    );
    const refreshToken = jwt.sign(
        { id: user._id, email: user.email_id },
        refreshTokenSecret
    );
    return { accessToken, refreshToken };
}


const verifyToken = (req, res, next) => {
    try {
      const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];
      console.log(req.cookies,token,'req.cookies',req.header("Authorization"));
  
      if (!token) {
        if(renewToken(req,res)){
            next()
        }
        return res.status(401).json({ message: "Access Denied. No token provided." });
      }
  
      jwt.verify(token, "33a469b7259978306279cdccd9a0c4cdd46fa4c74c6c9dce97c83af4235506fe", (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid or expired token." });
        }
        console.log(decoded,'decoded');
        req.user = decoded; // Store decoded token payload in request
        next();
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error.", error: error.message });
    }
  };

  module.exports={
    generateTokens,
    verifyToken
}

