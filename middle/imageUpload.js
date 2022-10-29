const multer = require("multer");
const uuid = require("uuid").v4;

const upload = multer({
  storage: multer.diskStorage({
    destination: "productData/images",
    filename: function (req, file, cb) {
      cb(null, uuid() + file.originalname);
    },
  }),
});

const configuredMulterMiddle = upload.single("productImage");

module.exports = configuredMulterMiddle;
