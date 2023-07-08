const controller = require('../controllers/sector.controller');
const verifyToken = require('../middleware/token')
module.exports = (app) => {
    app.post('/sector',verifyToken, controller.create);
    app.get('/sector', controller.select);
    app.get('/sector/:id', controller.selectById);
    app.delete('/sector/:id', controller.delete);
    app.put('/sector/:id', controller.update);
}