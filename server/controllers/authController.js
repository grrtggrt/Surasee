const jwt = require('jsonwebtoken');
const User = require('../models/auth');
const createError = require('../utils/appError');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return next(new createError('User not found!', 404));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new createError('Invalid username or password', 401));
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      status: 'success',
      token,
      message: 'Logged in successfully',
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        surname: user.surname,
      },
    });
  } catch (error) {
    next(error);
  }
};
