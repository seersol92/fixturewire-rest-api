const vessel = require('../models/vessel'); //import vessel  model schema

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of vessel list.
exports.vessel_list = function(req, res) {
 vessel.find({} , function(err, cargo_list) {
        if(err){
              res.json({
                   success: false,
                   errors:err
                });
          } else {
             res.json({
                success: true,
                data: cargo_list
            });
          }
       });
};

// Display detail page for a specific Company.
exports.vessel_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

/*
    METHOD: POST
    INFO  : Handle create new Company on POST.
*/
exports.vessel_create_post = function(req, res) {
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('own',  'Owner is required').notEmpty();
    req.checkBody('imo',  'IMO Number is required').notEmpty();
    req.checkBody('flag',  'Flag is required').notEmpty();
    req.checkBody('type',  'Type is required').notEmpty();
     var errors = req.validationErrors();
     if (errors) {
        res.json({
            success: false,
            message: errors
        });
     } else {
         
        let createVessel = new vessel({
               name:    req.body.name,
               own:     req.body.own,
               imo:     req.body.imo,
               flag:    req.body.flag,
               type:    req.body.type,
               vessel_class: req.body.vessel_class,
               added_by: req.body.added_by
              });
            createVessel.save( function(err) {
              if(err && err.errors){
                  res.json({
                       success: true,
                       errors:err.errors
                    });
              } else {
                res.json({
                    success: true,
                    message:'Vessel Registered Successfully!!'
                });
              }
           });
	 }
};

//Handle Update Vessel Request
exports.vessel_update_post = (req, res) => {
    vessel.findByIdAndUpdate(req.body.vessel_id, { $set: { 
        name:    req.body.name,
        own:     req.body.own,
        imo:     req.body.imo,
        flag:    req.body.flag,
        type:    req.body.type,
        vessel_class: req.body.vessel_class,
        added_by: req.body.added_by
    }},  function(err, numAffected) {
        if(err || numAffected.ok == 0) {
            res.json({
                success: false,
                message:'Update Process Failed!!',
                error: err
            });
        } else {
            res.json({
                success: true,
                message:'Vessel Registry Updated Successfully!!'
            });
        }
    });
}

// Handle Request delete on POST.
exports.vessel_delete = function(req, res) {
    vessel.deleteOne({ _id : req.body.vessel_id } , 
    function(err, numAffected) {
        if(err || numAffected.ok == 0) {
            res.json({
                success: false,
                message:'Process Failed!!'
            });
        } else {
            res.json({
                success: true,
                message:'Vessel Registry Deleted Successfully!!'
            });
        }
    });
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};