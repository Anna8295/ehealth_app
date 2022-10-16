//getting the endpoints from client request to show a list of videos from YouTube
const express = require('express');
const router = express.Router();
const usetube = require('usetube');
const catchAsync = require('../utils/catchAsync');

router.get('/video', catchAsync(async (req, res) => {
    const videos = await usetube.getPlaylistVideos('PLDGRDRM479GufVoWrmOiu4_98BJpgX9rV')
    res.render('videos/video', { videos })
}));

module.exports = router;