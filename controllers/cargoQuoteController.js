const CargoQuote = require('../models/cargo_quote'); //import CargoQuote  model schema
var ObjectID = require('mongodb').ObjectID; 

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all cargo quotes.
exports.cargo_list = function(req, res) {
 CargoQuote.find({} , function(err, cargo_list) {
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

// Display detail page for a specific cargo quote.
exports.cargo_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

/*
    METHOD: POST
    INFO  : Handle create new cargo on POST.
*/
exports.cargo_create_post = function(req, res) {
    console.log(req.body.date1);
    console.log(req.body.date2);
    req.checkBody('cargo_status', 'Cargo Status is required').notEmpty();
    req.checkBody('charterer',  'Charterer is required').notEmpty();
    req.checkBody('broker',  'Broker is required').notEmpty();
    req.checkBody('grade',  'Grade is required').notEmpty();
    req.checkBody('quantity',  'Quantity is required').notEmpty();
    req.checkBody('date1',  'Date1 is required').notEmpty();
    req.checkBody('date2',  'Date2 is required').notEmpty();
    req.checkBody('load',  'Load is required').notEmpty();
    req.checkBody('discharge',  'Discharge is required').notEmpty();
    req.checkBody('rate_type',  'Rate type is required').notEmpty();
    req.checkBody('rate',  'Rate is required').notEmpty();
    req.checkBody('vessel',  'Vessel is required').notEmpty();
    req.checkBody('remarks',  'Re-marks is required').notEmpty();
     var errors = req.validationErrors();
     if (errors) {
        res.json({
            success: false,
            message: errors
        });
     } else {
         
        let cargo = new CargoQuote({
           cargo_status: req.body.cargo_status.toLowerCase(),
           charterer:  req.body.charterer.toLowerCase(),
           broker:  req.body.broker.toLowerCase(),
           grade:     req.body.grade.toLowerCase(),
           quantity:  req.body.quantity.toLowerCase(),
           date1:  req.body.date1,
           date2:  req.body.date2,
           load:  req.body.load.toLowerCase(),
           discharge:  req.body.discharge.toLowerCase(),
           rate_type:  req.body.rate_type.toLowerCase(),
           rate:  req.body.rate.toLowerCase(),
           vessel:  req.body.vessel.toLowerCase(),
           remarks:  req.body.remarks.toLowerCase(),
           added_by: req.body.addedby.toLowerCase()
          });
           cargo.save( function(err) {
              if(err && err.errors){
                  res.json({
                       success: false,
                       errors:err.errors
                    });
              } else {
                 res.json({
                    success: true
                });
              }
           });
	 }
};

/*
    METHOD: POST
    INFO  : Handle  Update cargo on POST.
*/
exports.cargo_update_post = function(req, res) {
    var query = { '_id' : ObjectID(req.body.cargo_id)};
    let cargo = {
           cargo_status: req.body.cargo_status.toLowerCase(),
           charterer:  req.body.charterer.toLowerCase(),
           broker:  req.body.broker.toLowerCase(),
           grade:     req.body.grade.toLowerCase(),
           quantity:  req.body.quantity.toLowerCase(),
           date1:  new Date(req.body.date1).toDateString(),
           date2:  new Date(req.body.date2).toDateString(),
           load:  req.body.load.toLowerCase(),
           discharge:  req.body.discharge.toLowerCase(),
           rate_type:  req.body.rate_type.toLowerCase(),
           rate:  req.body.rate.toLowerCase(),
           vessel:  req.body.vessel.toLowerCase(),
           remarks:  req.body.remarks.toLowerCase(),
           added_by: req.body.addedby.toLowerCase()
        };
          
    CargoQuote.findOneAndUpdate(query, cargo, function(err, cargo_list) {
       if(err) {
            res.json({
               success: false,
               message:'No, Cargo Quote Found!!',
               error: err
            });
        } else {
             res.json({
               success: true,
               message:'Cargo Quote Updated Successfully!!'
            });
        }  
    });
};

//Handle import quotes from CSV



exports.import_cargo_quotes = (req, res) => {
   let importedQuotes = req.body.imported_quotes;
   const importedBy = req.body.imported_by;
   let quotes = [];
   if (importedQuotes.length > 0 ) {
        for (let i = 0; i < importedQuotes.length; i++) {
            quotes.push({
            cargo_status: importedQuotes[i][0],
            charterer:  importedQuotes[i][1],
            broker:  importedQuotes[i][2],
            grade:     importedQuotes[i][3],
            quantity:  importedQuotes[i][4],
            date1:  importedQuotes[i][5],
            date2:  importedQuotes[i][6],
            load:  importedQuotes[i][7],
            discharge:  importedQuotes[i][8],
            rate_type:  importedQuotes[i][9],
            rate:  importedQuotes[i][10],
            vessel:  importedQuotes[i][11],
            remarks:  importedQuotes[i][12],
            added_by: importedBy
            });
        }
        console.log(quotes);
        CargoQuote.insertMany(quotes ,function(err) {
            if(err && err.errors){
                res.json({
                     success: false,
                     message: 'Something went wrong to import quotes!!',
                     errors:err.errors
                  });
            } else {
               res.json({
                  message: 'Cargo quotes have been imported successfully!!',
                  success: true
              });
            }
         });
    } else {
        res.json({
            success: false,
            message: 'No Quotes Found To Be Imported!!'
        });
    }
};


// Handle  delete on POST.
exports.cargo_delete_post = function(req, res) {
    CargoQuote.deleteOne({ _id : req.body.cargo_id } , function(err, cargo_list) {
        if(err){
            res.json({
               success: false,
               message:'No, Cargo Quote Found!!'
            });
        } else {
            res.json({
                success: true,
                message:'Cargo Quote Deleted Successfully!!'
            });
        }
    });
};