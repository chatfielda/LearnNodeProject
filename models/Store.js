// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// const slug = require('slugs');

// const storeSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         trim: true,
//         required: 'Please enter a store name!'
//     },
//     slug: String,
//     description: {
//         type: String,
//         trim: true,
//     },
//     tags: [String],
//     created: {
//         type: Date,
//         default: Date.now
//     },
//     location: {
//         type: {
//             type: String,
//             default: 'Point'
//     },
//     coordinates: [{
//         type: Number,
//         required: 'You must supply coordinates!'
//         }],
//     address: {
//         type: String,
//         required: 'You must supply an address!'
//         }
//     },
//     photo: String,
// });

// storeSchema.pre('save', function(next) {
//     if(!this.isModified('name')) {
//         next(); // skip it
//         return; //stop this function from running 
//     }
//     this.slug = slug(this.name);
//     // find other stores that have a slug of Wes, Wes-1, Wes-2
//     const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
//     const storesWithSlug = await this.constructor.find({ slug:       slugRegEx });

//     if(storesWithSlug.length) {
//             this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
//     }


//     next();
//     // TODO make more resiliant so slugs are unique
// });



// module.exports = mongoose.model('Store', storeSchema);











// const mongoose = require('mongoose');

// exports.loginForm = (req, res) => {
//   res.render('login', { title: 'Login' });
// };

// exports.registerForm = (req, res) => {
//   res.render('register', { title: 'Register' });
// };

// exports.validateRegister = (req, res, next) => {
//   req.sanitizeBody('name');
//   req.checkBody('name', 'You must supply a name!').notEmpty();
//   req.checkBody('email', 'That Email is not valid!').isEmail();
//   req.sanitizeBody('email').normalizeEmail({
//     gmail_remove_dots: false,
//     remove_extension: false,
//     gmail_remove_subaddress: false
//   });
//   req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
//   req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
//   req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

//   const errors = req.validationErrors();
//   if (errors) {
//     req.flash('error', errors.map(err => err.msg));
//     res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
//     return; // stop the fn from running
//   }
//   next(); // there were no errors!
// };








// Skip to content

//     Why GitHub?
                          


                    
// Enterprise
// Explore
                      

                    
// Marketplace
// Pricing
                       


                        

// Sign in
// Sign up

39
854

    784

// wesbos/Learn-Node
// Code
// Pull requests 15
// Projects 0
// Insights
// Join GitHub today

// GitHub is home to over 36 million developers working together to host and review code, manage projects, and build software together.
// Learn-Node/stepped-solutions/23/models/Store.js
// @wesbos wesbos 🔥 8b0f2a1 on May 3, 2017
// 63 lines (58 sloc) 1.43 KB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  },
  photo: String
});

storeSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  // find other stores that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }
  next();
  // TODO make more resiliant so slugs are unique
});

storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
}

module.exports = mongoose.model('Store', storeSchema);

