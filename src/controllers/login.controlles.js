const usermodel = require('../model/user.model')
const jwt = require('jsonwebtoken')
async function login(req, res) {
    try {
        const code = req.body.code;
        const user = await usermodel.user.findOne({ code: code });
        if (!user) {
            return res.status(404).json({ message: "यह कोड अमान्य है" });
        }
        const token = jwt.sign({ userid: user._id }, process.env.JWT_TOKEN);
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(200).json({ message: "लॉगिन करने में सफलता", user: user ,token});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "लॉगिन करने में त्रुटि" });
    }
} 
module.exports = login