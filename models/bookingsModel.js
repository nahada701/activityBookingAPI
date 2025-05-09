const mongoose=require('mongoose')

const bookingSchema = new mongoose.Schema({

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users', 
        required: true 
    },
    activity: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'activities', 
         required: true 
        },
    bookedAt: { 
        type: Date, 
        default: Date.now 
    },
  });
  
  const bookings=mongoose.model("bookings",bookingSchema)
  
  module.exports=bookings