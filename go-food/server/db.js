const { json } = require("express");
const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://ravirajsahu312:mongo%40123456@cluster0.fvqba8w.mongodb.net/delivery-mern?retryWrites=true&w=majority";
const mongoDb = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) {
        console.log(`err--- ${err}`);
      } else {
        console.log("connected 19");
        const fetched_data = await mongoose.connection.db.collection(
          "food-items"
        );
        const data = await fetched_data.find({}).toArray();
        const foodCate = await mongoose.connection.db.collection(
          "food-category"
        );
        const food = await foodCate.find({}).toArray();
        global.food_cate = food;
        // console.log(global.food_cate);
        global.food_items = data;
        // console.log(global.food_items);
      }
    }
  );
  //   console.log("database connected");
  // const fetchedData = mongoose.connection.db.collection("food-items");
  // const collection = await fetchedData.find({}).toArray();
  // console.log("Number of collections " + collection.length);
  // collection.forEach((item, index) => {
  //   console.log(" ");
  //   // console.log(`Data ${index + 1}:`);
  //   Object.keys(item).forEach((key) => {
  //     // console.log(`${key}: ${item[key]}`);
  //   });
  // });
};

module.exports = mongoDb;
