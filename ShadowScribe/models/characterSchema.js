const mongoose=require("mongoose")

const characterSchema=new mongoose.Schema({
    name:String,
    species:{type:String,enum:["human","elf","orc"]},
    power:{type:Number,min:1,max:1000},
    factionId:{type:mongoose.Schema.Types.ObjectId,ref:"Faction"},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    deleted:{type:Boolean,default:false}

})

module.exports=mongoose.model("Character",characterSchema)