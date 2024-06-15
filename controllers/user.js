const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signUpUser = async(req, res, next) => {
    try {
        // Extract user data from request body
        const { userName, email, phone, password } = req.body;

        console.log(userName,email,phone,password);
    
        // Validate user input
        if (userName.length===0 || email.length===0 || phone.length===0 || password.length===0) {
          return res.status(400).json({ message : 'Please provide valid inputs' });
        }
    
        // Check if email already exists in the database
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists, please login.' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create new user instance
        const newUser = await User.create({
          userName,
          email,
          phone,
          password: hashedPassword,
        });

    
        // Respond with success message
        res.status(201).json({ message: 'Signed up successfully!', user: { id, userName, email, phone }});
        
      } catch (error) {
        console.error('Error while signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

exports.logInUser = async (req, res, next) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (email.length===0 || password.length===0) {
      return res.status(400).json({ message: 'Please provide valid email or password' });
    }

    // Find user by email in the database
    const user = await User.findOne({ where: { email } });

    // If user doesn't exist, return error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare provided password with hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    // If passwords don't match, return error
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If passwords match, create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.userName, email: user.email },
      process.env.JWT_SECRET, // Your JWT secret key
      { expiresIn: '1h' } // Token expiration time
    );

    const loggedInUser = {id: user.id, userName: user.userName, email: user.email, phone:user.phone}

    // Respond with success message and token
    res.status(200).json({ message: 'Loggged in successfully!', token, user:loggedInUser });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
