const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.publicKey,
    privateKey: process.env.privateKey, 
    urlEndpoint: process.env.urlEndpoint,
});

async function uploadFileToImageKit(fileBuffer, fileName) {
    try {
        const response = await imagekit.upload({
            file: fileBuffer, 
            fileName: fileName || 'default-image.jpg', 
        });
        return response;
    } catch (error) {
        console.error("ImageKit Error:", error);
        throw error;
    }
}

module.exports = uploadFileToImageKit;