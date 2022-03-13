//====== Import Packages ======
const nodemailer = require("nodemailer");
const { uri, dbApi } = require('../server');


//====== User Authorization Controller Functions ======
const register = async (req, res) => {
    const { username, password, first_name, last_name } = req.body;

    // Verify all fields were properly filled
    if (!(username && password && first_name && last_name)) {
        //============== Check if the username is already taken =============== //
        let userExists = dbApi.userNameExists(username);
        if(!userExists) {
            let hashedPassword = hashPassword(password);
            let userAdded = dbApi.addUser(username, hashedPassword, first_name, last_name);
            if(userAdded){
                res.json({status: "success"});
            } else {
                res.json({status: "failure"});
            }
        } else {
            res.json({status: "username exist"});
        }
    }
    else res.status(400).send("Please fill out all available fields.");
};


const login = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        if(dbApi.userNameExists(username)) {
            let hashedPassword = hashPassword(password);
            let dbUser = dbApi.getUserByPassword(hashedPassword);
            if(dbUser.username === username) {
                dbApi.loginUser(username, hashedPassword);
                res.sendStatus(200);
            } else res.send("The username and password combination provided was invalid.");
        } else res.send("We didn't find your account. Please ensure the username you provided is spelled correctly.");
    } else res.send("Please fill out all available fields.");
};

const logout = async (req, res, uid) => {
    console.log("Logging out...");
    let loggedOut = dbApi.logoutUser(uid);
    if(loggedOut == true){
        res.status(200).send("Successfully logged out.");
    } else { res.status(400).send("An error occurred attempting to log out.")}
};

// TODO: We need to replace the fake Ethereal SMTP service with a real SMTP service
// TODO: Investigate Heroku SMTP offerings: https://devcenter.heroku.com/articles/smtp
const forgotPassword = async (req, res) => {
    let { email } = req.body;
    let token = generateTempPassword();
    await dbApi.updatePassword(email, token);

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        // sender address
        from: 'robertpomichter@yahoo.com',
        // list of receivers
        to: `${email}`,
        // Subject line
        subject: "Proyecto Titi Password Reset Link",
        // plain text body
        text: `Please use the following link to reset your password: ${
            uri
        }/update-password/${token}`,
        // html body
        html: `<p>Please use the following link to reset your password:</p> <p>${
            uri
        }/update-password/${token}</p>`
    });

    console.log(`An email was sent to the user with email: ${email}.`);
    console.log(info);
    res.status(200).send('Please check your inbox for an email containing a link to reset your password.');
};

const updatePassword = async (req, res, tempPassword) => {
    let { new_password } = req.body;
    let hashedNewPassword = hashPassword(new_password);
    let user = dbApi.getUserByPassword(tempPassword);
    await dbApi.updatePassword(user.email, hashedNewPassword);
    res.status(200).send("Successfully updated your password.");
};


//====== Helper Functions ======
function generateTempPassword() {
    // Generate a random password
    return "temporaryPassword";
}

function hashPassword(password) {
    console.log(`Hash the password: ${password}`)
    return password;
}

//====== Export Controller Functions ======
module.exports = {register, login, logout, forgotPassword, updatePassword};