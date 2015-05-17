var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendfile('./public/html/listaSpesa.html');
});

module.exports = router;
