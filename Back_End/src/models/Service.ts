import { Schema } from "mongoose";


const ServiceSchema: Schema = new Schema({
    description: {type: String, require: true} ,
    name: {type: String, require: true} ,
    price: {type: Number, require: true} ,
    images: {type: [String], require: true} ,
})


export default ServiceSchema