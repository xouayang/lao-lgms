const controller = require('../controllers/province_departments.controller');
const verifyToken = require('../middleware/token')
module.exports = async (app) => {
    app.post('/rarul_department', verifyToken,controller.create);
    app.get('/rarul_department/:id',controller.get_all_by_id);

}