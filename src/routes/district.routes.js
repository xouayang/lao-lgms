const controller = require('../controllers/district.controller');
const verifyToken = require('../middleware/token')
module.exports = async (app) => {
    app.post('/district',verifyToken, controller.create);
    app.get('/district/:id', controller.get_all_by_id);
    // app.get('/address/city/:id', controller.allCity);
    // app.get('/address/village/:id', controller.allVillage);
}