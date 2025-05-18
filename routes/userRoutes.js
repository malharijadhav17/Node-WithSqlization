const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// multer config
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'uploads/'),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/register', upload.single('image'), registerUser);
router.post('/login', loginUser);

router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, upload.single('image'), updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;
