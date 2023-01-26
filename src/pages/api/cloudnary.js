const express = require('express');
const cloudinary = require('cloudinary').v2;
const stream = require('stream');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

app.use(bodyParser.json());
app.use(
  multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
  }).single('file')
);

cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret'
});

app.post('/upload', async (req, res) => {
    console.log(req.body)
    try {
        const { file } = req;
        const fileStream = cloudinary.uploader.upload_stream({
            resource_type: 'raw',
            public_id: `zip/${file.originalname}`,
            invalidate: true,
            eager: [
                {
                    raw_convert: 'zip'
                }
            ]
        }, (error, result) => {
            if (error) {
                return res.status(500).send(error);
            }
            return res.status(200).send(result);
        });
        const bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        bufferStream.pipe(fileStream);
        fileStream.on('upload_progress', (data) => {
            const progress = data.bytesLoaded * 100 / data.bytesTotal;
            console.log(`Upload progress: ${progress}%`);
            res.write(`Upload progress: ${progress}%\n`);
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 3000');
});
