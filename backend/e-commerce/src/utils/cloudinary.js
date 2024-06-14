const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "du5s2eegk",
    api_key: "245765756818269",
    api_secret: "BxSuTSPh8nJQJzf1BVIGZvn_a3o"
});

const uploadeFile = async (localPath, folderName) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(localPath, {
            folder: folderName
        }).catch((error) => { console.log(error) });
        return uploadResult;

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    uploadeFile
}