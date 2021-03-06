'use strict';

const router = require('express').Router();

// Setup routes
const authRouters = require('./auth/index'),
      guiStockManagerRouters = require('./guiStockManager/index'),
      homeRouters = require('./home');


router.use('/', homeRouters);
router.use('/auth', authRouters);
router.use('/stock/gui', guiStockManagerRouters);

// Error handling middleware here
// Must be added after all other the router.use()
router.use('*', (req, res, next) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('errors/404', { title: '404 - Page not found!' });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: '404 - Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('404 - Not found');
});


module.exports = router;
