const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    image: String,
    author_name: String,
    author_image: String,
    created: String,
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model("Picture", pictureSchema);