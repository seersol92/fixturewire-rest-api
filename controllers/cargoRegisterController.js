const CargoRegister = require('../models/cargo_register'); //import CargoRegister  model schema

// Display list of all cargo register.
exports.cargo_list = function(req, res) {
 CargoRegister.find({} , function(err, cargo_list) {
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

// Display detail page for a specific cargo register.
exports.cargo_detail = function(req, res) {
    res.send('NOT IMPLEMENTED:  detail: ' + req.params.id);
};

/*
    METHOD: POST
    INFO  : Handle create new cargo on POST.
*/
exports.cargo_create_post = function(req, res) {
    req.checkBody('grade', 'Grade is required').notEmpty();
    req.checkBody('description',  'Description is required').notEmpty();
    req.checkBody('type',  'Type is required').notEmpty();
     var errors = req.validationErrors();
     if (errors) {
        res.json({
            success: false,
            message: errors
        });
     } else {
         
        let cargo = new CargoRegister({
            api: req.body.api,
            sulfur: req.body.sulfur,
            origin: req.body.origin,
            origin_terminal: req.body.origin_terminal,
            grade: req.body.grade,
            description:  req.body.description,
            type:  req.body.type,
            added_by: req.body.added_by
          });
           cargo.save( function(err, numAffected) {
              if(err && err.errors || numAffected.ok === 0 ){
                  res.json({
                       success: true,
                       message: 'Process Failed!!',
                       errors:err.errors
                    });
              } else {
                 res.json({
                    success: true,
                    message: 'New Cargo Has Been Registered!!'
                });
              }
           });
	 }
};

// Handle delete on POST.
exports.cargo_delete = function(req, res) {
    CargoRegister.deleteOne({ _id : req.body.cargo_id } , function(err, numAffected) {
        if(err || numAffected.ok === 0){
            res.json({
               success: false,
               message:'No, Cargo Registry Found!!'
            });
        } else {
            res.json({
                success: true,
                message:'Cargo Registry Deleted Successfully!!'
            });
        }
    });
};

// Display  update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED:  update GET');
};

// Handle  update on POST.
exports.update_cargo = function(req, res) {
    CargoRegister.findByIdAndUpdate(req.body.cargo_id, { $set: { 
        api: req.body.api,
        sulfur: req.body.sulfur,
        origin: req.body.origin,
        origin_terminal: req.body.origin_terminal,
        grade: req.body.grade,
        description:  req.body.description,
        type:  req.body.type
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
                message:'Cargo Registry Updated Successfully!!'
            });
        }
    });
};