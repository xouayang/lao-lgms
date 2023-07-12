const Province = require("../models/province.model");
const bcrypt = require('bcrypt')
exports.create = async (req, res) => {
  const user = req.payload;
  try {
    const {profile,user_name,password,role, province_title } = req.body;
    const hashPassword = await bcrypt.hash(password,10)
    await Province.create({
      province_title,
      profile,
      user_name,
      password:hashPassword,
      role,
      user_id: user.id,
    })
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((error) => {
        return res.status(404).json({ message: error.message });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.selectAll = async (req, res) => {
  try {
    const province = await Province.findAndCountAll();
    if (!province) {
      return res.status(404).json({ message: "No province found." });
    }
    res.json(province);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.selectById = async (req, res) => {
  const { id } = req.params;
  try {
    const province = await Province.findByPk(id);
    if (!province) {
      return res.status(404).json({ message: "this id not found" });
    }
    res.status(200).json(province);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const province = await Province.findByPk(id);
    if (!province) {
      return res.status(404).json({ message: "this id not found" });
    }
    let { province_title, profile, user_id } = req.body;
    delete user_id;
    await province.update({
      profile,
      province_title,
    });
    res.status(200).json({ message: "update province success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const province = await Province.findByPk(id);
    if (!province) {
      return res.status(404).json({ message: "this id not found" });
    }
    await province.destroy();
    res.status(200).json({ message: "delete province success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
