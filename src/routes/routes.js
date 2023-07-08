const express = require('express');
const router = express.Router();

// import file
const departmentOrganizationRoute = require('./department.organization.routes');
const departmentOrganizationMemberRoute = require('./department_orginazation_member.routes');
const departmentForeignRoute = require('./department.foreign.routes');
const departmentMenberRoute = require('./department.menber.routes');
const provinceRoute = require('./province.routes');
const ministryRoute = require('./ministry.routes');
const department = require('./department.routes');
const addressRoute = require('./address.routes');
const sectorRoute = require('./sector.routes');
const userRoute = require('./user.routes');
const rarul_departments = require('./rarul_department.routes');

//use file
departmentOrganizationRoute(router);
departmentForeignRoute(router);
departmentMenberRoute(router);
ministryRoute(router);
provinceRoute(router);
addressRoute(router);
sectorRoute(router);
department(router);
userRoute(router);
rarul_departments(router);
departmentOrganizationMemberRoute(router);

// export router
module.exports = router;
