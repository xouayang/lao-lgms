const Ministry = require("../models/ministry.models");
const sequelize = require("../configs/db");
const { QueryTypes } = require("sequelize");
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.create = async (req, res) => {
  const user = req.payload.id;
  try {
    const { ministry_title, profile,user_name,password,role } = req.body;
    if(!ministry_title || !profile || !user_name || !password || !role) {
      return res.status(400).json({message:"The body is not empty"})
    }
    const hashPassword = await bcryt.hash(password,10)
    const data = {
      ministry_title:ministry_title,
      profile:profile,
      user_name:user_name,
      password:hashPassword,
      role:role,
      user_id:user
    }
    await Ministry.create(data)
      .then((success) => {
        console.log(data)
        return res.status(200).json(success);
      })
      .catch(() => {
        return res.status(400).json(data);
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// login 
exports.signIn = async (req, res) => {
  try {
    const {user_name,password} = req.body;
    const data_ministry = await Ministry.findOne({where:{user_name:user_name}})
    if(!data_ministry) {
      return res.status(404).json({message:"not found user"})
    }
    const checkPassword = await bcryt.compare(password,data_ministry.password)
    if(!checkPassword) {
      return res.status(404).json({message:"password invialid"})
    }
    const m_data = {
      id:data_ministry.id,
      user_name:data_ministry.user_name,
      profile:data_ministry.profile,
      role:data_ministry.role
    }
    const token = jwt.sign(m_data, process.env.SECRET_KEY, { expiresIn: "120d" });
    res.status(200).json({token:token})
  } catch (error) {
   return res.status(500).json({message:error.message}) 
  }
}

exports.selectAll = async (req, res) => {
  try {
    const id = req.payload.id
     await Ministry.findAll({where:{id:id}}).then((data) => {
      if(data.length > 0 ){
        return res.status(200).json(data)
      }
     }).catch((error) => {
      return res.status(400).json({message:error.message})
     })
    // const sql = `
    //   select mt.ministry_title,mt.profile,us.name,mt.created_at from users us 
    //   inner join ministries mt on us.id = mt.user_id
    // `;
    // const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    // if (data.length > 0) {
    //   return res.status(200).json(data);
    // } else {
    //   return res.status(404).json({ message: "NOT FOUND DATA" });
    // }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.selectById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
      select mt.id,us.name,dto.department_organization_title,dto.created_at  from ministries mt 
      inner join department_organizations dto on mt.id = dto.ministry_id
      inner join users us on mt.user_id = us.id
      where mt.id = '${id}'
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

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const ministry = await Ministry.findByPk(id);
    if (!ministry) {
      return res.status(404).json({ message: "this id not found" });
    }
    let user = req.body;
    delete user.user_id;
    await ministry.update({
      ministry_title: req.body.ministry_title,
      profile: req.body.profile,
    });
    res.status(200).json({ message: "update ministry successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const ministry = await Ministry.findByPk(id);
    if (!ministry) {
      return res.status(404).json({ message: "this id not found" });
    }
    await ministry.destroy();
    res.status(200).json({ message: "delete ministry successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
