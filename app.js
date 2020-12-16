const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
app.use(cors())
app.use('/mp3', express.static('mp3'))
var Downloader = require("./downloader");
var dl = new Downloader();
var i = 0;
let filename;
const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __dirname + "/mp3/";
  
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  };

  
function YouTubeGetID(url) {
    var ID = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    }
    else {
        ID = url;
    }
    return ID;
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/get', (req, res) => {
    let yid = YouTubeGetID(req.query.youtubeid)
    filename = req.query.filename
    let response;
    console.log()
    dl.getMP3({ videoId: yid }, function (err, resp) {
        i++;
        if (err)
            throw err;
        else {
            console.log("Song " + i + " was downloaded: " + resp.file);
            response = "Song " + i + " was downloaded: " + resp.file
            res.send(response)
        }

    });
    //res.send(response)
})

app.get("/files/:name", download);

app.get('/user/:filename',function(req,res,next){
    let id = req.params.filename
    res.send(id)
    next();

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})