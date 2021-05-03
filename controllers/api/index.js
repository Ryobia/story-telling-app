const router = require('express').Router();

const userRoutes = require('./user-routes');
const storyRoutes = require('./story-routes');
const contributionRoutes = require('./contribution-routes');

router.use('/users', userRoutes);
router.use('/stories', storyRoutes);
router.use('/contributions', contributionRoutes);

module.exports = router;