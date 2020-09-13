const router = require('express').Router();
const apiRouters = require('express').Router();
const authRouter = require('./auth.route');
const messageRoute = require('./message.route');

// Routes
router.use('/api/v1', apiRouters);
apiRouters.use('/auth', authRouter);
apiRouters.use('/message', messageRoute);

module.exports = router;