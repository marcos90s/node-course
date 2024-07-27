const express = require('express')
const playlistController = require('../controllers/playlistController')

const router = express.Router()

router.get('/playlists', playlistController.getAllPlaylists)
router.get('/playlists/:id', playlistController.getPlaylistById)

router.post('/playlists',playlistController.insertPlaylist)
router.post('/playlists/:id/music', playlistController.insertMusic)

router.put('/playlists/:id', playlistController.updateData)

router.delete('/playlists/:id',playlistController.deletePlaylist)
router.delete('/playlists/:id/musics/:title',playlistController.deleteMusicFromPlaylist)
module.exports = router