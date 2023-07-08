const DepartmentOrganization = require("../models/department.organization.moldel");

exports.create = async (req, res) => {
  const user = req.payload;
  try {
    const { department_organization_title, ministry_id } = req.body;

     await DepartmentOrganization.create({
      department_organization_title,
      ministry_id,
      user_id: user.id,
    })
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.selectAll = async (req, res) => {
  try {
    const data = await DepartmentOrganization.findAndCountAll();
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.selectAllById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await DepartmentOrganization.findAndCountAll({
      where: { id },
    });
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.selectById = async (req, res) => {
  try {
    const { id } = req.params;
    const departmentOrganization = await DepartmentOrganization.findByPk(id);

    if (!departmentOrganization) {
      return res
        .status(404)
        .json({ error: "Department organization not found" });
    }

    res.status(200).json(departmentOrganization);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Failed to retrieve the department organization" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await DepartmentOrganization.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: "this id not found" });
    }
    let department = await req.body;
    await delete department.user_id;
    await data.update({
      department_organization_title: req.body.department_organization_title,
    });
    res.status(200).json({ message: "update department organization" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await DepartmentOrganization.findByPk(id);

    if (!data) return res.status(404).json({ message: "this id not found" });
    await data.destroy();
    res
      .status(200)
      .json({ message: "delete department organization successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
