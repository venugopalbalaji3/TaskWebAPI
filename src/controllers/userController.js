const cln_user = require('../model/cln_user')
const cln_users = require('../model/cln_user')
const { dynamicUpdateFunction, dynamicFindFunction } = require('../utils/dbOperations')
const {generateTokens} = require('../middlewares/authMiddleware')
const { encryptPassword } = require('../utils/helpers')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {
    console.log(req.body, 'request')
    try {
        var requestInfo = req.body
        requestInfo["password"] = await bcrypt.hash(requestInfo.password, 10);
        console.log(requestInfo, 'requestInfo')
        const savedInfo = await dynamicUpdateFunction(cln_users, requestInfo, { _id: req.body._id || new mongoose.Types.ObjectId() })
        console.log(savedInfo, 'savedInfo')
        if (savedInfo) {
            res.status(200).json({ message: "data stored successfully" })
        }

    } catch (error) {
        console.log(error, 'error')
        res.status(500).json({ error })

    }
}



const authenticateUser = async (req, res) => {

    try {
        var requestInfo = req.body
        var userInfo = await dynamicFindFunction(cln_users, { email: req.body.email })
        var token={}
        if (userInfo.length > 0) {
            const isMatch = await bcrypt.compare(requestInfo.password, userInfo[0].password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            tokenInfo = await generateTokens({ _id: userInfo[0]["_id"], email: req.body.email });
            res.cookie('refreshToken', tokenInfo.refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'None',
            })
  
            console.log(tokenInfo,'tokenInfo')
            res.status(200).json({
                message: 'Login successful',
                user: {
                    email: userInfo[0].email,
                    id: userInfo[0]._id,
                    accesstoken:tokenInfo.accessToken
                },
            });
        }
    } catch (error) {
        res.status(500).json({ error })

    }
}




module.exports = {
    registerUser,
    authenticateUser
}