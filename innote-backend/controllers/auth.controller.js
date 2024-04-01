const authServices = require('../services/auth.service');

//SignUp Process
const SignUp = async (req, res, next) => {
    try {
        const data = await authServices.SignUpProcess(req.body);
        res.send(data)
    } catch (e) { next(e) }
};
//SignIn Process
const SignIn = async (req, res, next) => {
    // console.log(req)
    try {
        const data = await authServices.SignInProcess(req.body);

        
        // Creating refresh token not that expiry of refresh(token is greater than the access token)
        // const refreshToken = jwt.sign({
        //     username: data.username,
        // }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        // Assigning refresh token in http-only cookie 
        // res.cookie('_refresh_token', refreshToken, {
        //     httpOnly: true,
        //     sameSite: 'None', secure: true,
        //     maxAge: 24 * 60 * 60 * 1000
        // });
        res.send(data)
    } catch (e) { next(e) }
    // const { username, password } = res.body;
    // const data = await authServices.SignInProcess(username, password) //for manual testing
    // req.status(200);
    // req.send(data);
    // console.log(data);
};

module.exports = {
    SignIn,
    SignUp,
}