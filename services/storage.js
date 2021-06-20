const Cube = require('../models/Cube');
const Comment = require('../models/Comments');
const Accessory = require('../models/Accessory');

async function init() {

    return (req, res, next) => {
        req.storage = {
            getAll,
            getById,
            create,
            edit,
            createComment,
            createAccessory,
            getAllAccessory,
            attachSticker
        };
        next();
    };
}

async function getAll(query) {
    const options = {};

    if (query.search) {
        options.name = { $regex: query.search, $options: 'i' };
    }

    if (query.from) {
        options.difficultyLevel = { $gte: Number(query.from) };
    }

    if (query.to) {
        options.difficultyLevel = options.difficultyLevel || {};
        options.difficultyLevel.$lte = Number(query.to);

    }

    const cubes = Cube.find(options);

    return cubes;
}

async function getById(id) {
    const cube = await Cube.findById(id).populate('comments').populate('accessories');

    if (cube) {
        return cube;
    } else {
        return undefined;
    }

}

async function create(cube) {
    const record = new Cube(cube);
    return record.save();
}

async function edit(id, cube) {
    const existing = await Cube.findById(id);

    if (!existing) {
        throw new ReferenceError('No such id in database');
    }

    Object.assign(existing, cube);
    return existing.save();
}

async function createComment(cubeId, comment) {
    const cube = await Cube.findById(cubeId);

    if (!cube) {
        throw new ReferenceError('No such ID in database');
    }

    const newComment = new Comment(comment);
    await newComment.save();

    cube.comments.push(newComment);
    await cube.save();
}

async function getAllAccessory(existing) {
    return Accessory.find({ _id: { $nin: existing } });
}

async function createAccessory(accesory) {
    const record = new Accessory(accesory);

    return record.save();
}

async function attachSticker(cubeId, stickerId) {
    const cube = await Cube.findById(cubeId);
    const sticker = await Accessory.findById(stickerId);

    if (!cube || !sticker) {
        throw new ReferenceError('No such ID in database');
    }

    cube.accessories.push(sticker);
    return cube.save();
}

module.exports = {
    init,
    getAll,
    getById,
    create,
    createComment,
    createAccessory,
    getAllAccessory,
    attachSticker
}