const Image = require('../models/image');
const HttpError = require('../models/http-error');
var { promisify } = require('util');

const getImages = async (req, res, next) => {
  let images;
  try {
    images = await Image.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching images failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ images: images.map(image => image.toObject({ getters: true })) });
};

const makeImage = async (req, res, next) => {
  const { url, name, type } = req.body;
  let existingImage;
  try {
    existingImage = await Image.findOne({ url: url }); //simply finds one document matching the criteria in the argument of our method
  } catch (err) {
    const error = new HttpError('Please try again later.', 500);
    return next(error);
  }
  if (existingImage) {
    const error = new HttpError('Image with this url exists already.', 422);
    return next(error);
  }

  const createdImage = new Image({
    url,
    name,
    type,
  });

  try {
    await createdImage.save();
  } catch (err) {
    const error = new HttpError(
      'Creating image failed, please try again later.',
      500
    );
    return next(error);
  }
  /*
  var sizeOf = promisify(require('image-size'));
  (async () => {
    try {
      const dimensions = await sizeOf(createdImage.url);
      console.log(dimensions.width, dimensions.height);
    } catch (err) {
      console.error(err);
    }
  })().then(c => console.log(c));
*/

  res.status(201).json({
    id: createdImage.id,
    url: createdImage.url,
    name: createdImage.name,
    type: createdImage.type,
    metaData: {
      //size: dimensions,
      extType: createdImage.url.split('.').pop(),
    },
  });
};

exports.makeImage = makeImage;
exports.getImages = getImages;
