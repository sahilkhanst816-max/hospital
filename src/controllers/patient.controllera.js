const modelPatient = require('../model/user.model')
const jwt = require('jsonwebtoken')
const multer = require('multer')
async function createPatient(req, res) {
    try {
        const { name, email, phone, age, gender, role } = req.body

        if (!name || !email || !phone || !age || !gender) {
            return res.status(400).json({ message: 'Please provide all the required fields' })
        }

        const patient = new modelPatient.user({
            name,
            email,
            phone,
            age,
            gender,
            role,
            gender,

        })
        await patient.save();
        const token = jwt.sign({ userid: patient._id }, process.env.JWT_TOKEN)
        res.cookie('token', token)

        res.status(201).json(patient)
    } catch (error) {
        console.log("Patient बनाने में एरर:", error.message);
        res.status(500).json({ message: 'Error creating patient' })
    }
}
async function getAllPatients(req, res) {
    try {
        const patients = await modelPatient.user.find({})
        if (!patients) {
            return res.status(404).json({ message: 'user data nahi aaya' });
        }
        const data = patients.filter((patient) => patient.role === 'user')
        res.status(200).json(data)
    } catch (error) {
        console.log("प्राथमिक में एरर:", error.message);
        res.status(500).json({ message: 'Error fetching patients' })
    }
}
module.exports = {
    createPatient, getAllPatients
}