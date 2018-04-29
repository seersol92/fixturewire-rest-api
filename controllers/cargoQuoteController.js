const CargoQuote = require('../models/cargo_quote'); //import CargoQuote  model schema
const importCargoQuote = require('../models/import_cargo_quote');
const moment = require('moment');
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
           type: req.body.type,
           cargo_status: req.body.cargo_status,
           market: req.body.market,           
           charterer:  req.body.charterer,
           broker:  req.body.broker,
           grade:     req.body.grade,
           quantity:  req.body.quantity,
           date1:  makeDate(req.body.date1),
           date2:  makeDate(req.body.date2),
           load:  req.body.load,
           discharge:  req.body.discharge,
           rate_type:  req.body.rate_type,
           rate:  req.body.rate,
           vessel:  req.body.vessel,
           remarks:  req.body.remarks,
           added_by: req.body.addedby
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
           type: req.body.type,
           cargo_status: req.body.cargo_status,
           market: req.body.market,
           charterer:  req.body.charterer,
           broker:  req.body.broker,
           grade:     req.body.grade,
           quantity:  req.body.quantity,
           date1:  makeDate(req.body.date1),
           date2:  makeDate(req.body.date2),
           load:  req.body.load,
           discharge:  req.body.discharge,
           rate_type:  req.body.rate_type,
           rate:  req.body.rate,
           vessel:  req.body.vessel,
           remarks:  req.body.remarks,
           added_by: req.body.addedby
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

const makeDate = (input_date) => {
    if(moment(input_date).isValid() || typeof input_date !== "undefined") {
        return moment(input_date).toISOString( );
    } else {
        return moment().toISOString( );
    } 
} 

const checkEmpty = (data) => {
    if(typeof(data) == 'undefined' || data === null || typeof(data.length) === 'undefined')
    {
      return false; 
    }
    return true
}

exports.import_cargo_quotes = (req, res) => {
   let importedQuotes = req.body.imported_quotes;
   const importedBy = req.body.imported_by;
   let quotes = [];
   if (importedQuotes.length > 0 ) {
        for (let i = 0; i < importedQuotes.length; i++) {
            if ( checkEmpty (importedQuotes[i][1]) && checkEmpty (importedQuotes[i][2]) && checkEmpty(importedQuotes[i][3])  && checkEmpty(importedQuotes[i][4])) 
            {
                quotes.push({
                cargo_status: importedQuotes[i][0],
                type: importedQuotes[i][1],
                charterer:  importedQuotes[i][2],
                broker:  importedQuotes[i][3],
                grade:     importedQuotes[i][4],
                quantity:  importedQuotes[i][5],
                date1:   makeDate(importedQuotes[i][6]),
                date2:   makeDate(importedQuotes[i][7]),
                load:  importedQuotes[i][8],
                discharge:  importedQuotes[i][9],
                rate_type:  importedQuotes[i][10],
                rate:  importedQuotes[i][11],
                vessel:  importedQuotes[i][12],
                remarks:  importedQuotes[i][13],
                added_by: importedBy
                });
            }
        }

        importCargoQuote.insertMany(quotes ,function(err) {
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