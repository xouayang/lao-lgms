const district = require("../models/district.model");
const sequelize = require("../configs/db");
const { QueryTypes } = require("sequelize");
// create Rarul
exports.create = async (req, res) => {
  try {
    const user = req.payload.id;
    console.log(req.body);
    const { province_departments_id, title } = req.body;
    const prepare = {
      province_departments_id: province_departments_id,
      title: title,
      user_id: user,
    };
    await district
      .create(prepare)
      .then((data) => {
        if (data) {
          return res.status(201).json(data);
        }
      })
      .catch((error) => {
        return res.status(404).json({ message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all
exports.get_all_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
         select pd.id,pd.title,
         pd.created_at,dt.id as district_id,dt.title as district_title
          from province_departments pd 
         inner join districts dt on pd.id = dt.province_departments_id
         where pd.id = '${id}'
        `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "NOT FOUND DATA" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// delete
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    await district.destroy({ where: { id: id } }).then((deleted) => {
      if (deleted) {
        return res.status(200).json({ message: "Deleted" });
      } else {
        return res.status(404).json({ message: "CAN'T NOT DELETED" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// update
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    await district.update({ title: title }, { where: { id: id } }).then(
      (updated) => {
        if (updated) {
          return res.status(200).json({ message: "Updated" });
        }
        return res.status(404).json({ message: "NOT UPDATED" });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
