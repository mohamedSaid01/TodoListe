import mongoose from "mongoose";

mongoose.connect("mongodb+srv://sa3id:t6uFKTvLjtqJKwtr@cluster0.lvnn3ym.mongodb.net/todo-app")
.then(()=>{
  console.log("mongoose collection done");
})
.catch(()=>{
  console.log("mongoose collection faild"); 
})