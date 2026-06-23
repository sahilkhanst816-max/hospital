const modelDailyRoutine = require('../model/user.model');
const jwt = require('jsonwebtoken');

async function createDailyRoutine(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "token nahi aaya / Please login first" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decodedToken.userid || decodedToken.id;

        const loggedInStaff = await modelDailyRoutine.user.findOne({ _id: userId });

        if (!loggedInStaff) {
            return res.status(404).json({ message: "staff nahi mila " });
        }

        if (loggedInStaff.role !== 'DataEntry') {
            return res.status(403).json({
                message: "Access Denied! token nahi aaya"
            });
        }
        const index = req.params.index;
        const font = await modelDailyRoutine.user.findById(index);

        if (!font) {
            return res.status(404).json({ message: "मरीज का डेटा नहीं मिला!" });
        }
        const { bloodGroup, weight, heartBeat, bloodPressure, currentCondition, pastOperations, allergies, imageUrl, uniqueCode, createdBy , checkupTime} = req.body;

        if (!bloodGroup || !weight || !heartBeat || !bloodPressure || !currentCondition || !pastOperations || !allergies || !imageUrl || !uniqueCode || !createdBy) {
            return res.status(400).json({ message: 'Please provide all the required fields' });
        }

        const todaysData = {
            bloodGroup,
            weight,
            heartBeat,
            bloodPressure,
            currentCondition,
            pastOperations,
            allergies,
            imageUrl,
            uniqueCode,
            createdBy,
            checkupTime
        };
        font.dailyRoutine.push(todaysData);
        await font.save();
        res.status(200).json({
            message: "Staff verification successful! Patient data has been updated.",
            patient: font
        });

    } catch (error) {
        console.log("error aaya :", error.message);
        res.status(500).json({ message: "server error" });
    }
}
module.exports = createDailyRoutine;