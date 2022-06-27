const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { createAlbum, getAllAlbums, getAlbumById, updateAlbum, deleteAlbum, } = require('./src/dbHelper/albumDbHelper.js');
const { createPurchase }  = require("./src/dbHelper/purchaseDbHelpers")

// Parsers
bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT  }`)
})

// TODO code the API

app.post("/albums", async (req, res) => {
    if (Object.keys(req.body).length === 0 ) {
        res.status(400).json({
            message: "Request body empty!"
        })
    }

    const {title, performer, cost} = req.body;
    const album = await createAlbum({title, performer, cost});

    if (album.error) {
        res.status(500).json({
            message: album.error
        })
    }
    res.status(201).json({
        message: "New book record created",
        data: album
    })

})

app.get("/albums", async (req, res) => {
    const albums = await getAllAlbums();
    if (albums.error) {
      res.status(500).json({
          message: albums.error.message
      })
    }
    res.status(200).json( {
        message: "Fetched all albums",
        data: albums
    })
})

app.get("/albums/:id", async (req, res) => {
    const album = await getAlbumById(req.params.id);
    if (album.error) {
        res.status(500).json({
            message: album.error.message,
        })
    }
    res.status(200).json({
        message: "Item found",
        data: album
    })
})

app.put("/albums/:id", async (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).json({
            message: 'Request body cannot be empty',
        })
    }

    const album = await updateAlbum(req.params.id, req.body)
    if (album.error) {
        res.status(500).json({
            message: album.error,
        })
    }
    res.status(200).json({
        message: 'Successfully created.',
        data: album.data
    })
})

app.delete("/albums/:id", async (req, res) => {
    const result = await deleteAlbum(req.params.id);
    if (result.error) {
        res.status(500).json({
            message: result.error.message,
        })
    }
    res.status(200).json({
        message: result.message
    })
})

app.post("/purchases", async (req, res) => {
    if (Object.keys(req.body).length === 0 ) {
        res.status(400).json({
            message: "Request body empty!"
        })
    }

    const {user, album} = req.body;
    const purchase = await createPurchase({userId: user.id, albumId: album.id});

    if (purchase.error) {
        res.status(500).json({
            message: purchase.error
        })
    }
    res.status(201).json({
        message: "New book record created",
        data: req.body
    })
})

module.exports = app;