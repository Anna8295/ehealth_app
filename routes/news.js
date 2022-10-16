//getting the endpoints from client request to show recent news from the medical.net
const express = require('express');
const router = express.Router();
const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://www.news-medical.net/medical/search?q=Parkinsons-Disease&t=all&fsb=1'

router.get('/news', async (req, res) => {
    axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const news = []

        $('.resultTitle', html).each(function(){
            const tittle = $(this).text();
            const url = 'https://www.news-medical.net' + $(this).find('a').attr('href');
            news.push({
                tittle,
                url
            })
        })
        res.render('news/news', { news })
    }).catch(err => console.log(err))
});

module.exports = router;