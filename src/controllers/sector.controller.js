const Sector = require('../models/sector.model');

exports.create = async (req, res) => {
  const user = req.payload;
  try {
    const { rarul_department_id, sector_title } = req.body;
    const prepare = {
      rarul_department_id:rarul_department_id,
      sector_title:sector_title,
      user_id:user.id
    }
    await Sector.create(prepare).then((success) => {
      if(success) {
        return res.status(200).json(success)
      } else {
        return res.status(404).json({message:"Faild"})
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sector' });
  }
}

exports.select = async (req, res) => {
  try {
    const sectors = await Sector.findAndCountAll();
    res.status(200).json(sectors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sectors' });
  }
};

exports.selectById = async (req, res) => {
  try {
    const { id } = req.params;
    const sector = await Sector.findByPk(id);
    if (!sector) {
      return res.status(404).json({ message: 'this sector not found' });
    }
    res.status(200).json(sector)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sector' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    let { department_foreign_id, user_id, sector_title } = req.body;

    delete user_id;
    delete department_foreign_id;

    const [updatedRowsCount, [updatedSector]] = await Sector.update(
      { department_foreign_id, sector_title },
      { where: { id }, returning: true }
    );

    if (updatedRowsCount > 0) {
      res.status(200).json({ sector: updatedSector });
    } else {
      res.status(404).json({ error: 'Sector not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update sector' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Sector.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: "this sector not found" });
    }
    await data.destroy();
    res.status(200).json({ message: 'delete sector success' })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}