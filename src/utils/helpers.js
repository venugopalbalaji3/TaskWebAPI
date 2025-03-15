const crypto = require('crypto-js');


const encryptPassword = async(password) => {
    const secretKey =  '123456';
    return crypto.AES.encrypt(password, secretKey).toString(); 
  };


  const decryptPassword = (encryptedPassword) => {
    const secretKey ='123456';
    const bytes = crypto.AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(crypto.enc.Utf8);
  };


  module.exports={
    encryptPassword,
    decryptPassword
  }