const mobileUtils = require('../../../libs/mobileUtils');
const mongoose = require('mongoose');
const Mobile = mongoose.model('Mobile', {
  id: {
    type: Number,
    required: true
  },
  mobileNumber: {
    type: String,
    validate: {
      validator(value) {
        return mobileUtils.validateMobileNumber(value);
      },
      message: '{VALUE} is not a valid mobile number!'
    },
    required: [true, 'Mobile number required']
  },
  title: {
    type: String,
    required: true
  }
});

module.exports = Mobile;
