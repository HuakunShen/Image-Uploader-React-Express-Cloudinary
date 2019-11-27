const express = require('express');
const app = express();
require('dotenv').config();
const formData = require('express-form-data');
const cloudinary = require('cloudinary').v2;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(formData.parse());
// setup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('root route');
});

app.post('/upload', (req, res) => {
  console.log('upload route reached');
  const public_id = req.body.public_id;
  const options = {};
  if (public_id) {
    options.public_id = public_id;
  }
  const values = Object.values(req.files);
  console.log('public id: ', public_id);
  const promises = values.map(image =>
    cloudinary.uploader.upload(image.path, options)
  );

  Promise.all(promises)
    .then(results => res.json(results))
    .catch(err => res.status(400).json(err));
});

app.delete('/upload/:public_id', (req, res) => {
  if (!req.params.public_id) return res.status(400).send('no public id');
  cloudinary.uploader.destroy(req.params.public_id, function(error, result) {
    console.log('deleting file ' + req.params.public_id);
    console.log(result, error);
  });
});

app.listen(PORT, () => {
  console.log(`Server started, listening on port ${PORT}`);
});
