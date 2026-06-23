const express = require('express')
const router  = express.Router()
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
);
router.get('/google/auth-url', (req, res) => {
    try {
        if (!process.env.GOOGLE_CLIENT_ID) {
            console.log("❌ Client ID नहीं मिली! अपनी .env फाइल चेक करें।");
            return res.status(400).json({ success: false, message: "Missing Client ID" });
        }

        const scopes = [
            'https://www.googleapis.com/auth/fitness.activity.read',
        ];

        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
        });

        console.log("✅ URL जनरेट हो गया: ", url);
        res.status(200).json({url})

    } catch (error) {
        console.error("❌ Auth URL बनाने में एरर:", error.message);
      
        res.status(500).json({ success: false, message: error.message });
    }
});
router.post('/google/get-steps', async (req, res) => {
    const { code } = req.body;

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const startTimeMillis = today.getTime();
        const endTimeMillis = new Date().getTime(); 

        const response = await fitness.users.dataset.aggregate({
            userId: 'me',
            requestBody: {
                aggregateBy: [{
                    dataTypeName: 'com.google.step_count.delta',
                    dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
                }],
                bucketByTime: { durationMillis: 86400000 }, 
                startTimeMillis,
                endTimeMillis
            }
        });

        const bucket = response.data.bucket[0];
        let totalSteps = 0;

        if (bucket && bucket.dataset[0] && bucket.dataset[0].point[0]) {
            totalSteps = bucket.dataset[0].point[0].value[0].intVal;
        }

        res.json({ success: true, steps: totalSteps });

    } catch (error) {
        console.error("Google API Error:", error.message);
        res.status(500).json({ success: false, message: 'Steps निकालने में दिक्कत आई' });
    }
});
module.exports = router
