const router = require('express').Router();
const apiRouters = require('express').Router();
const authRouter = require('./auth.route');

// Routes
router.use('/api', apiRouters);
apiRouters.use('/auth', authRouter);

module.exports = router;