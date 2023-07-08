const controller = require('../controllers/ministry.controller');
const verify = require("../middleware/token");

module.exports = (app) => {
    app.post('/ministry',verify, controller.create);
    app.post('/signIn-ministry', controller.signIn);
    app.get('/ministry',verify,controller.selectAll);
    // app.get('/ministry/:id', controller.selectById);
    // app.delete('/ministry/:id', controller.delete);
    // app.put('/ministry/:id', controller.update);
}