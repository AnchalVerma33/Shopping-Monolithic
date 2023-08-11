const { BadRequestError } = require("../errors/app-errors");
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });

const FilterValues = (fields, not_allowed_values, obj) =>{
    try{    
        if(!fields){
            fields = [];
        }
        if(!not_allowed_values){
            not_allowed_values = [];
        }
        for (let field of fields)
        for (let value of not_allowed_values)
            if (obj[field] === value)
                throw new Error(`${field} cannot contain ${value} `);
    } catch (e) {
    throw new BadRequestError(e);
    }
};

const ValidateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(!emailRegex.test(email)){
        throw new BadRequestError("Invalid Email")
      }
  };

  
  const ValidatePassword = (password) => {
    const number = /[0-9]/g;
    const upperCase = /[A-Z]/g;
    const lowerCase = /[a-z]/g;
    if (
      !password ||
      password.length < 8 ||
      !number.test(password) ||
      !upperCase.test(password) ||
      !lowerCase.test(password)
    ) {
      throw new BadRequestError("Invalid Password")
    }
  };


  const GenerateSalt = async() => {
    try{
        return await bcrypt.genSalt();
    } catch(e) {
        throw new Error(`Unable to generate Salt ${e}`);
    }
  }


  const GeneratePassword = async (password, salt) => {
	try {
		return await bcrypt.hash(password, salt)
	} catch (e) {
		throw new Error(`Unable to create Password ${e}`);
	}
};

const GenerateUUID = () => {
	let id = uuid();
	return id;
};

const FormatData = (data) => {
	if (data) {
		return { data };
	} else {
		throw new Error(`Data Not found!`);
	}
};

const ComparePass = async (enteredPass, savedPass, salt) => {
    try{
        return bcrypt.compare(enteredPass, savedPass);
    } catch(e) {
        throw new Error(`Password didn't match ${e}`);
    }
}

const GenerateToken = async (payload) => {
    try{
        const APP_SECRET = process.env.APP_SECRET;
        return jwt.sign(payload, APP_SECRET, { expiresIn: "5d" });
    }
    catch (e) {
        throw new Error(`Unable to generate token ${e}`);
    }
}


module.exports = { FilterValues, ValidateEmail, ValidatePassword, GenerateSalt, GeneratePassword, GenerateUUID, FormatData, ComparePass, GenerateToken};