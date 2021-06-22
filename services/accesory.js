const Accessory = require('../models/Accessory');

async function getAllAccessory(existing) {
    return Accessory.find({ _id: { $nin: existing } });
}

async function createAccessory(accesory) {
    const record = new Accessory(accesory);

    return record.save();
}

module.exports = {
    createAccessory,
    getAllAccessory,
}