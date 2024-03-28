const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
 
const app = express();
 
app.use(cors());
app.use(express.json());

const crypto = require('crypto');

const SECRET_KEY = crypto.randomBytes(64).toString('hex');

mongoose.connect('mongodb+srv://ashmitharengasamy96:gwJenBY7wv86bDnI@finalproj.l7bz8hb.mongodb.net/FinalProj')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));



app.get('/sendmail',async (req,res)=>{
  const requestingUser = req.query.requestingUser;

  const link = `http://localhost:3000/changepassword?emailID=${encodeURIComponent(requestingUser)}`

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: "nadiminti@jmangroup.com",  // Replace with your email
      pass: "Jman@600113"
    }
  });
  
  const mailOptions = {
    from: "nadiminti@jmangroup.com",
    to: requestingUser,
    subject: 'Login Successful',
    text: `change password here: ${link}`
  };

  await transporter.sendMail(mailOptions);
  return res.status(200).send('Sent Mail');
})

app.get('/api/users/first', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }   
});

app.post('/login', async (req, res) => {
    const { emailID, password } = req.body;
    console.log(req.body)
    // username="deeps"
    try {
      const user = await User.findOne({ emailID });
      console.log(user);
  
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { userId: user._id, username: user.username },
          SECRET_KEY,
          { expiresIn: '1h' }
        );
        res.status(200).json({ token });
      } else {
        res.status(401).send('Login failed');
      }
    } catch (error) {
      console.error('Error loogging in:', error);
      res.status(500).send('Server error');
    }
  });

app.post('/create', async (req,res) => {
  try {
    const {emailID, role, fullName, username, phoneNumber, department } = req.body;

    const password = 'default';
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      emailID: emailID.toLowerCase(),
      role, 
      fullName, 
      username, 
      phoneNumber, 
      department,
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    console.log("User Registered Successfully");
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.post('/update', async (req, res) => {
  const { emailID, newpassword } = req.body;

  try {
    const user = await User.findOne({ emailID });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newpassword, salt);
    await user.save();

    return res.status(200).send('User Saved successfully!');
  } catch (error) {
    console.error('Error loogging in:', error);
    return res.status(500).send('Server error');
  }
});
 
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});