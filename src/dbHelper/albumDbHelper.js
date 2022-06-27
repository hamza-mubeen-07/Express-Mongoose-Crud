const Album  = require("../models/album.js");

module.exports.createAlbum = async (data) => {
    try {
        const newAlbum = new Album(data);
        if(!newAlbum.save()) throw new Error('Album could not be saved');
        return {
            performer: newAlbum.performer,
            cost: newAlbum.cost,
            title: newAlbum.title,
            id: newAlbum.id
        }
    } catch (error) {
        return {error: error.message}
    }
}

module.exports.getAllAlbums = async () => {
    try {
        const albums = await Album.find({});
        return albums.length ? albums : []
    } catch (error) {
        return {
            error: error.message
        };
    }
}

module.exports.getAlbumById = async (id) => {
    try {
        const album = await Album.findById(id);
        if (album.id) {
            return album
        }
        return {
            error: "Album not found!"
        }
    } catch (error) {
        return {
            error: error.message
        }
    }
}

module.exports.updateAlbum = async (id, data) => {
    try{
        const updatedAlbum = await Album.findByIdAndUpdate(id, data,{new: true})
        if(!updatedAlbum) throw new Error('Failed to update Album')
        return {message: "successfully updated", data: updatedAlbum}
    } catch (error) {
        return {error: error.message,}
    }
}

module.exports.deleteAlbum = async (id) => {
    try {
        const isDelete = await Album.findOneAndRemove(id);
        if(!isDelete) throw new Error("Could not delete album")
        return {
            message: "deleted successfully",
        }
    } catch (error) {
        return {
            error: error.message,
        }
    }
}

