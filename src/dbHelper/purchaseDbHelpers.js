const Purchase = require("../models/purchase");

module.exports.createPurchase = async ({userID, albumId}) => {
    try {
        const newPurchase = new Purchase({user: userID, album:  albumId});
        const savedPurchase = newPurchase.save();
        if(!savedPurchase) throw new Error("Could not delete album")
        return savedPurchase;
    } catch (error) {
        return {
            error: error.message,
        }
    }
}