const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flatSchema = new Schema({
    name:String,
    occupied:Boolean,
    renter:{type: Schema.Types.ObjectId, ref: 'Users'},
    imageUrl:[{type:String}],
    videoUrl:[{type:String}],
    facilites:[{type:String}],
    discription:String,
    location:String,
    latitude:{type:Schema.Types.Decimal128},
    longitude:{type:Schema.Types.Decimal128},
    city:String,
    contact:{ type: Schema.Types.ObjectId, ref: 'Users' },
    typeOfFamily:String,
    size:String,
    amount:Number,
    NearbyFacilities:[{type:String}]
},
{
    timestamps:true
})

flatSchema.statics.getAllFlats = async () =>{
    const flats = await Flat.find().populate('contact');
    return flats;
}

flatSchema.statics.getFlat = async (id) =>{
    const flat = await Flat.findById(id).populate('contact');
    return flat;
}

flatSchema.statics.updateFlat = async () =>{
    
}

const Flat = mongoose.model("flats",flatSchema);

module.exports = Flat;