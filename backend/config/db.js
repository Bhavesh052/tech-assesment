import mongoose from "mongoose";
import dbconnect from 'mongodb-ci'


export const connectDB = async () =>{
    //add your db url 
    await mongoose.connect('').then(()=>{
        console.log('DB connected') ;
        dbconnect();
    })
}