var express = require('express');
var router = express.Router();

router.get('/productlist', function(req, res) {
    var db = req.db;
    db.collection('listaprodotti').find().toArray(function(err, items) {
        res.json(items);
    });
});

router.post('/addproduct', function(req, res) {
    var db = req.db;
    db.collection('listaprodotti').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
            );
    });
});


router.delete('/delproduct/:_id', function(req,res){
    var db = req.db;
    var prodToDelete = req.params._id;
    db.collection('listaprodotti').removeById(prodToDelete, function(err, result){   
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.post('/updproduct/:_id', function(req,res){
    var db = req.db;
    var prodToUpdate = req.params._id;
    var updates = req.body.updates;
    db.collection('listaprodotti').updateById(prodToUpdate, updates, function(err, result){   
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;