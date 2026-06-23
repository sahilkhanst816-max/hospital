const mongoose = require('mongoose');
const dsa = require('dns')
dsa.setServers([
    '1.1.1.1',
    '0.0.0.0'
])
function connectToDB() {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connection successful"); 
        })
        .catch((err) => { 
            console.log("kam nahi kya. Asli error yeh hai:");
           console.log(err)
            process.exit(1);
        });
}

module.exports = connectToDB;  