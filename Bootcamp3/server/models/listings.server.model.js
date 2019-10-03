//EDITED

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose') ,
Schema = mongoose.Schema;

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */
var listingSchema = new Schema({
  /* Your code for a schema here */ 
  //Check out - https://mongoosejs.com/docs/guide.html

  //info possible in a Listing
  code: {type: String, required: true, unique: true},
  name: {type: String, required: true, unique: true},
  coordinates: { 
    latitude: Number,
    longitude: Number
  },
  address: String,
  created_at: Date,
  updated_at: Date

});

/* Create a 'pre' function that adds the updated_at (and created_at if not already there) property 
   See https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/
listingSchema.pre('save', function(next) {
  //retreive current date
  var date = new Date();
  this.updated_at = date;
  if(!this.created_at) // just created, no date added yet
    this.created_at = date;
  next();
});

/* Check out - https://mongoosejs.com/docs/guide.html#models
  Use your schema to instantiate a Mongoose model 
  Make a "document" (model instance)
  mongoose.model uses default connection (else replace mongoose w/ connection)
  documentName = *.(modelName, schema)
*/
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;