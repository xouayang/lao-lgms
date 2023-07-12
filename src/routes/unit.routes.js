const controller = require('../controllers/unit.controller');
const verifyToken = require('../middleware/token')
module.exports = async (app) => {
    app.post('/unit',verifyToken, controller.create);
    app.get('/unit/:id', controller.get_all_by_id);
    // app.get('/address/city/:id', controller.allCity);
    // app.get('/address/village/:id', controller.allVillage);
}