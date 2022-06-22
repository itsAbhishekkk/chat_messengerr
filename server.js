
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());

const mdb = `mongodb+srv://${process.env.DB}:${process.env.DB}@cluster0.nbi0d.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
async function mongoConnector() {
  try {
    const db = await mongoose.connect(
  mdb
    );
    console.log("mongodb connected!");
  } catch (err) {
    console.log("mongodb error", err);
  }
}
mongoConnector();

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  value: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Data = mongoose.model("Data", userSchema);


app.get("/take/:id",async(req,res)=>{
const id = req.params.id;
console.log("working for id ->",id);

console.log("server is called!")
const user = await Data.findOne({id});
if(user){
  console.log("user found! and loggedin")
  res.status(200).json(user);
}
else{
  console.log("sorry! cannot be login")
res.status(404).json({});
}
})


app.post("/transfer", async (req, res) => {
  let { id, value } = req.body;
  console.log(id,value,"in server.js");
  try{

const checking = await Data.findOne({id});
if(!checking){
  const newData = new Data({id,value});
  const result = await newData.save();
  console.log("created!")
  return res.send("saved!")
}
else{
 console.log("updating!..",id,value)
var to_be_update = await Data.findOne({id});
to_be_update.value = value;
const result = await to_be_update.save();
if(result){
  console.log("updated!")
  return res.status(200).send("updated!")
}
 else{
  console.log("error in updating!")
  return res.status(400).send("error in updating!")
 }

}



  }
  catch(err){
console.log("error ",err);
  }
});

// added for heroku purpose
app.use(
  express.static(path.join(__dirname, "/client/build"))
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/client/build", "index.html")
  );
});

// 
const server = app.listen(PORT, (req, res) => {
  console.log("server started");
});

const socket = require("socket.io");
const io = socket(server);

io.on("connection", (socket) => {
  console.log("socket connected")
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});


