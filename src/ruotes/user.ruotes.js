const express = require('express');
const patientController = require('../controllers/patient.controllera')
const dailyRoutineController = require('../controllers/dailyRoutine.controlles')
const router = express.Router();
router.post('/patient', patientController.createPatient)
router.get('/patient/get', patientController.getAllPatients)
router.post('/dailyroutine/:index', dailyRoutineController)

module.exports = router