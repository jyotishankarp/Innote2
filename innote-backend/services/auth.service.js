var jwt = require("jsonwebtoken");
const UserRepository = require("../repos/auth.repo");
const bcrypt = require("bcrypt");


const SignUpProcess = async (info) => {
    const { password, ...rest } = info;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { ...rest, password: hashedPassword };
    const data = await UserRepository.SignUp(userData);
    if (!data.dataValues) throw new ApiError(400, "Unable to SignUp")
    return { message: "User SignUp successfull" };
}
//For Signing IN
const SignInProcess = async (info) => {
    const data = await UserRepository.SignIn(info);
    if (!data) throw new ApiError(400, "User Not Found")
    const result = await bcrypt.compare(info.password, data.dataValues.password);
    if (result != true) throw new ApiError(400, "Password incorrect")
    if (data.dataValues.enabled2FA == true) {
        const params = {
            id: data.dataValues.id,
            username: data.dataValues.username,
            twoFactorEnabled: data.dataValues.enabled2FA,
        }
        const token = jwt.sign(params, process.env.TWOFA_PRIVATE_KEY, {
            expiresIn: "1h"
        })
        return { twoFAtoken: token, enabled2FA: data.dataValues.enabled2FA };
        // return jwt.sign(params, process.env.TWOFA_PRIVATE_KEY, {
        //     expiresIn: "1h"
        // }), data.dataValues.enabled2FA;
    }
    const claimedData = await ClaimedDetails.UserClaims(data.dataValues);
    // console.log("claimedData"+claimedData);
    //for passing another Token in the Token
    const params1 = {
        claim: claimedData
    }
    const claimtoken = jwt.sign(params1, process.env.PRIVATE_KEY)
    // console.log("claimedToken"+claimtoken)
    //for passing dirwct Token in the Token use "claimedData"
    const params = {
        id: data.dataValues.id,
        username: data.dataValues.username,
        twoFactorEnabled: data.dataValues.enabled2FA,
        role: data.role_id,
        claim: claimedData,
    }
    const token = jwt.sign(params, process.env.PRIVATE_KEY, {
        expiresIn: "24h"
    })
    return { logintoken: token, name: data.dataValues.full_name };
};

module.exports = {
    SignInProcess,
    SignUpProcess,
}