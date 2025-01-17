//third party module
const mongoose=require('mongoose');
const express=require('express');
const webpush=require('web-push')
const bodyParser=require('body-parser');//core module
const cors = require('cors')

const publicVapidKey='BNd0TixFDsz4rsKrP676X3j6-cpwNNaeT5JlqCdG9YD-vb_Q6TVle8OzPEFnmA6ChN31nmpABAgm9oK3BmxtVHU';
const privateVapidKey='vTZuLsQMsnFdA7qp3oZJlruPw6vJkjY8uwJuYl0q0Zo';

webpush.setVapidDetails('mailto:test@gmail.com',publicVapidKey,privateVapidKey);

const db=require('./database/db');
const userRoute=require('./routes/userRoute');
const adminRoute=require('./routes/adminRoute');
const productRoute=require('./routes/productRoute');
const rentCartRoute=require('./routes/rentCartRoute');
const buyCartRoute=require('./routes/buyCartRoute');
const favouriteRoute=require('./routes/favouriteRoute');
const promocodeRoute=require('./routes/promocodeRoute');
const rentBillRoute=require('./routes/rentBillRoute');

const faqRoute=require('./routes/faqRoute');
const commentRoute=require('./routes/commentRoute');

const path=require('path')
const dotenv = require('dotenv')

const publicDir=path.join(__dirname+ "public")
const app=express();



dotenv.config({
  "path":'./.env'
})




webpush.setVapidDetails('mailto:sariyanmagar@gmail.com', publicVapidKey, privateVapidKey)
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(userRoute);
app.use(adminRoute);
app.use(productRoute);
app.use(rentCartRoute);
app.use(buyCartRoute);
app.use(favouriteRoute);
app.use(promocodeRoute);
app.use(rentBillRoute);
app.use(faqRoute);
app.use(commentRoute);
app.use("/public", express.static(__dirname+ "/public"));

app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const { subscription, title, message } = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title, message });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));

    res.status(200).json({ success: true });
});

// app.get('/', (req, res) => {
//     res.send('GOGO Gaming')
//   })

app.listen(90);
// app.listen(process.env.PORT, () => {
//     console.log("App listening at http://localhost:90")
// });