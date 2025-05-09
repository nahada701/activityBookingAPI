const activities=require('../models/activityModel');
const bookings = require('../models/bookingsModel');
const { bookActivityValidation, addActivityValidation } = require('../validators/validators');

exports.addActivityController=async(req,res)=>{
    console.log("Inside list activity controller")
    const { error } = addActivityValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const { title, description, location, dateTime } = req.body;
    
        if (!title || !description || !location || !dateTime) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        const newActivity = new activities({
          title,
          description,
          location,
          dateTime,
        });
    
        await newActivity.save();
    
        res.status(200).json(newActivity);
    }
    catch(err){
        res.status(500).json({error:"ServerError",details:err.message})
    }
}
exports.getAllActivityController=async(req,res)=>{
    console.log("Inside list all activity controller")


    try {
        const allActivities=await activities.find()
        res.status(200).json(allActivities);
    }
    catch(err){
        res.status(500).json({error:"ServerError",details:err.message})
    }
}
exports.bookActivityController=async(req,res)=>{
    console.log("Inside book activity controller")
  
  
    const { error } = bookActivityValidation.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const{activityId}=req.params
        const userId=req.userId
        const selectedActivity=await activities.findById(activityId)
        if(!selectedActivity){
            return re.status(404).json({message:"Activity not found"})
        }
        const alreadyBooked = await bookings.findOne({ user: userId, activity: activityId });
        if (alreadyBooked) {
          return res.status(400).json({ message: "You already booked this activity" });
        }

        const booking = new bookings({
            user: userId,
            activity: activityId
          });
      
          await booking.save();
      
          res.status(200).json({ message: "Activity booked successfully", booking });
    

    }
    catch(err){
            res.status(500).json({error:"ServerError",details:err.message})
        }
    
}