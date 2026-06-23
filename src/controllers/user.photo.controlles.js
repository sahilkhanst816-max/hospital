const modelPatient = require('../model/user.model');
const uploadFileToImageKit = require('../services/imgkits'); 

async function photo(req, res) {
    try {
        const index = req.params.index; 
        
        const font = await modelPatient.user.findById(index);
        if (!font) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Please upload a file" });
        }

        const uploadedFile = await uploadFileToImageKit(
            req.file.buffer, 
            req.file.originalname
        );

        font.dailyRoutine.imageUrl = uploadedFile.url; 
        await font.save(); 

        return res.status(200).json({
            message: "Image updated successfully",
            url: uploadedFile.url,
            user: font
        });

    } catch (error) {
        console.error("Error in photo upload:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = photo;
