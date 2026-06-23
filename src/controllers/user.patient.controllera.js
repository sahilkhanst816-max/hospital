const modelPatient = require('../model/user.model')
const jwt = require('jsonwebtoken')

async function createPatient(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "token nahi aaya / Please login first" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decodedToken.userid || decodedToken.id;

        const loggedInStaff = await modelPatient.user.findOne({ _id: userId });
        console.log(loggedInStaff);
        res.status(200).json(loggedInStaff);
    }
    catch (error) {
        console.log("प्राथमिक में एरर:", error.message);
        res.status(500).json({ message: 'Error creating patient' })
    }
}
module.exports = createPatient

