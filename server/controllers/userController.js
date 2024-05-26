const User = require('../models/auth');
const bcrypt = require('bcrypt');
// const path = require('path');
// const fs = require('fs');

const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      name: user.name,
      surname: user.surname,
      profileImage: user.profileImage ? user.profileImage.toString('base64') : null,
    });
  } catch (error) {
    console.error('Error fetching user info:', error); // Debug log
    res.status(500).json({ message: 'Server error' });
  }
};


const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, surname, profileImage } = req.body;

    // console.log('Updating user info for ID:', userId); // Debug log
    // console.log('Received data:', { name, surname, profileImage }); // Debug log

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.surname = surname;

    if (profileImage) {
      user.profileImage = Buffer.from(profileImage, 'base64');
    } else {
      user.profileImage = undefined;
    }

    await user.save();

    // console.log('User updated:', user); // Debug log
    res.json({ 
      message: 'User profile updated successfully', 
      profileImage: user.profileImage ? `data:image/jpeg;base64,${user.profileImage.toString('base64')}` : null 
    });
  } catch (error) {
    console.error('Error updating user:', error); // Debug log
    res.status(500).json({ message: 'Server error' });
  }
};

// const uploadProfileImage = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     console.log('Uploading profile image for ID:', userId); // Debug log
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (req.file) {
//       // Save the file to a specific directory
//       const uploadPath = path.join(__dirname, '..', 'uploads', `${userId}_${Date.now()}_${req.file.originalname}`);
//       fs.writeFileSync(uploadPath, req.file.buffer);

//       // Update the user's profile image URL
//       user.profileImage = uploadPath;
//       await user.save();

//       res.json({
//         message: 'Profile image uploaded successfully',
//         profileImage: uploadPath
//       });
//     } else {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }
//   } catch (error) {
//     console.error('Error uploading profile image:', error); // Debug log
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

module.exports = { getUserInfo, changePassword, updateUser };
