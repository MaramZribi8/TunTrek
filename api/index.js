const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const User = require('./models/User.js');
const Review = require('./models/Review.js');
const AdminMessage = require('./models/AdminMessage.js');
const Message = require('./models/Message');
const bcrypt = require('bcryptjs');
const CookieParser = require('cookie-parser');
const imageDownloader = require("image-downloader");
const multer = require('multer');
const fs = require('fs');
const ws = require('ws');

const Place = require('./models/Place.js');
require('dotenv').config();
const Booking = require("./models/Booking.js");
const bcryptSalt = bcrypt.genSaltSync(10);
const app = express();
app.use(express.json());
app.use(CookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/UserPhoto', express.static(__dirname + '/UserPhoto'));
app.use('/chatuploads', express.static(__dirname + '/chatuploads'));

app.use(cors({
  credentials: true,

  origin: 'http://localhost:5173',

}));

mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');
app.get('/test', (req, res) => {
  res.json('test ok');
});
app.post('/reviews', async (req, res) => {
  try {
    const { productId, userId, rating, text } = req.body;

    // Create a new review instance
    const newReview = new Review({
      userId,
      productId,
      rating,
      text
    });

    // Save the new review to the database
    const savedReview = await newReview.save();

    res.status(201).json(savedReview); // Send the saved review as a response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/admin/messages', async (req, res) => {
  try {
    const { email, name, message } = req.body;

    // Find the user by email and name
    const user = await User.findOne({ email, name });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new AdminMessage instance
    const newAdminMessage = new AdminMessage({
      userId: user._id,
      message
    });

    // Save the new AdminMessage to the database
    const savedAdminMessage = await newAdminMessage.save();

    res.status(201).json(savedAdminMessage); // Send the saved AdminMessage as a response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/admin/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch admin messages from the database for the given userId
    const adminMessages = await AdminMessage.find({ userId: id });

    res.status(200).json(adminMessages); // Send the admin messages as a response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/reviews/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find reviews for the specified product ID
    const reviews = await Review.find({ productId });

    res.status(200).json(reviews); // Send the reviews as a response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/reviews/:reviewId', async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    // Find the review by ID and delete it
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}


app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);


  } catch (err) {
    if (err) throw err;
    res.status(500).json('error');
  }
});
async function getUserDataFromRequest(req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.token;
    if (token) {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    } else {
      reject('no token');
    }
  });

}

app.get('/messages/:userId', async (req, res) => {
  const { userId } = req.params;
  const userData = await getUserDataFromReq(req);
  const ourUserId = userData.id;
  const messages = await Message.find({
    sender: { $in: [userId, ourUserId] },
    recipient: { $in: [userId, ourUserId] },
  }).sort({ createdAt: 1 });
  res.json(messages);
});

app.get('/people', async (req, res) => {
  const users = await User.find({ isAdmin: false }, { '_id': 1, 'name': 1, 'photo': 1 });
  res.json(users);
});

const server = app.listen(4001);
const wss = new ws.WebSocketServer({ server });

wss.on('connection', (connection, req) => {
  function notifyAboutOnlinePeople() {
    // Convert the Set of all clients into an array for easier manipulation
    const allClients = [...wss.clients];

    // Map each client to an object with their user data
    const onlineUsers = allClients.map(client => ({
      userId: client.userId,
      username: client.username,
      photo: client.photo
    }));

    // Send this list to each connected client
    allClients.forEach(client => {
      client.send(JSON.stringify({
        online: onlineUsers
      }));
    });
  }

  connection.isAlive = true;

  connection.timer = setInterval(() => {
    connection.ping();
    connection.deathTimer = setTimeout(() => {
      connection.isAlive = false;
      clearInterval(connection.timer);
      connection.terminate();
      notifyAboutOnlinePeople();
      console.log('dead');
    }, 1000);
  }, 5000);

  connection.on('pong', () => {
    clearTimeout(connection.deathTimer);
  });

  // Extract and verify JWT from the connection request's cookies if available
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokenCookieString = cookies.split(';').find(str => str.trim().startsWith('token='));
    if (tokenCookieString) {
      const token = tokenCookieString.split('=')[1];
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) {
          console.error('JWT verification failed:', err);
          return; // Handle error, e.g., by closing the connection
        }
        connection.userId = userData.id; // Assuming 'id' is the field in userData
        connection.username = userData.name;
        connection.photo = userData.photo;
      });
    }
  }

  // Message event listener for this connection
  connection.on('message', async (message) => {
    try {
      const messageData = JSON.parse(message);
      const { sender, recipient, text, file } = messageData;
      let filename = null;
      if (file) {
        const parts = file.name.split('.');
        const ext = parts[parts.length - 1];
        filename = Date.now() + '.' + ext;
        const path = __dirname + '/chatuploads/' + filename;
        const bufferData = Buffer.from(file.data.split(',')[1], 'base64');
        fs.writeFile(path, bufferData, () => {
          console.log('File saved: ' + path);
        });
      }
      if (recipient && (text || file)) {
        const messageDoc = await Message.create({
          sender: sender, // Use sender directly from the message data
          recipient,
          text,
          file: file ? filename : null
        });
        console.log('Created message:', messageDoc);

        // Broadcast the message to the intended recipient
        [...wss.clients]
          .filter(c => c.userId === recipient)
          .forEach(c => c.send(JSON.stringify({
            text,
            sender: sender,
            recipient,
            file: file ? filename : null,
            _id: messageDoc._id,
          })));
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  notifyAboutOnlinePeople();
});


/*app.put("/profile", async (req, res) => {
  const { name, email, password } = req.body;
  const { userId } = req.params;

  try {
    //Update the user using the provided userId
    const updatedUser = await User.findByIdAndUpdate(userId, {
      name,
      email,
      //Only update the password if it's provided and valid
      ...(password && { password: bcrypt.hashSync(password, bcryptSalt) }),
    }, { new: true });

    /// Send the updated user object in the response
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
*/
//sLvQvIZCTZYGFg4g
app.get('/users', async (req, res) => {
  try {
    // Fetch only non-admin users
    const nonAdminUsers = await User.find({ isAdmin: false }, { '_id': 1, 'name': 1, 'email': 1, 'photo': 1, 'isAdmin': 1, 'isActivated': 1, 'inTrouble': 1 });
    res.json(nonAdminUsers);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).send("Error fetching users");
  }
});

app.delete('/user-places/:id', (req, res) => {
  const { id } = req.params;

  Place.findByIdAndDelete(id)
    .then(deletedPlace => {
      if (!deletedPlace) {
        return res.status(404).send({ message: 'Place not found' });
      }
      res.send({ message: 'Place deleted successfully', deletedPlace });
    })
    .catch(err => {
      console.error('Error deleting place:', err);
      res.status(500).send({ error: 'Internal server error' });
    });
});
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (userDoc) {
      // Check if the account is activated
      if (!userDoc.isActivated) {
        return res.status(403).json({ message: 'Your account has been deactivated by the administrator. Please contact support for further assistance.' });
      }

      const passOk = bcrypt.compareSync(password, userDoc.password);

      if (passOk) {
        jwt.sign({
          email: userDoc.email,
          id: userDoc._id
        }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(401).json({ message: 'Incorrect password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/profile/:userId', (req, res) => {
  const { userId } = req.params;
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' }); // Token verification failed
      } else {
        // Fetch the user data by the userId from the URL
        const user = await User.findById(userId);
        if (!user) {
          res.status(404).json({ message: 'User not found' }); // No user with that ID
        } else {
          const { name, email, _id, photo, Favorites, isAdmin, isActivated, inTrouble } = user;
          res.json({ name, email, _id, photo, Favorites, isAdmin, isActivated, inTrouble }); // Respond with user data
        }
      }
    });
  } else {
    res.status(403).json({ message: 'No token provided' }); // No token in the request
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        res.json(null); // Send response indicating token is invalid
      } else {
        // Fetch the user data including the photo field
        const user = await User.findById(userData.id);
        if (!user) {
          res.status(404).json({ message: 'User not found' }); // User not found
        } else {
          const { name, email, _id, photo, Favorites, isAdmin, isActivated, inTrouble } = user;
          res.json({ name, email, _id, photo, Favorites, isAdmin, isActivated, inTrouble }); // Include the photo in the response
        }
      }
    });
  } else {
    res.json(null); // Send response indicating no token
  }
});

app.put("/profile", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        res.json(null); // Send response indicating token is invalid
      } else {
        try {
          const data = await User.findOneAndUpdate(
            { _id: userData.id },
            {
              $set: {
                email: req.body.email,
                name: req.body.name,
                photo: req.body.photo,
                Favorites: req.body.Favorites,
                isAdmin: req.body.isAdmin,
                isActivated: req.body.isActivated,
                inTrouble: req.body.inTrouble,
              }
            },
            { new: true } // Return the updated document
          );

          res.status(200).send({ message: 'UPDATED', data: data });
        } catch (error) {
          console.error('Error updating user profile:', error);
          res.status(500).send({ message: 'Internal server error' });
        }
      }
    });
  } else {
    res.json(null); // Send response indicating no token
  }
});

app.put('/profile/:userId/toggleActivation', async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user ID is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Fetch user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle isActivated attribute
    user.isActivated = !user.isActivated;

    // Save updated user
    const updatedUser = await user.save();

    res.status(200).json({ message: 'User isActivated attribute toggled successfully', user: updatedUser });
  } catch (error) {
    console.error('Error toggling user activation status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/profile/:userId/toggleTrouble', async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user ID is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Fetch user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle isActivated attribute
    user.inTrouble = !user.inTrouble;

    // Save updated user
    const updatedUser = await user.save();

    res.status(200).json({ message: 'User inTrouble attribute toggled successfully', user: updatedUser });
  } catch (error) {
    console.error('Error toggling user trouble status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//oYxnRlROgpvVGoed
// Your routes and other middleware here

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});
app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName);

});
const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    // Generate new filename with extension
    const newFilename = `${Date.now()}.${ext}`;
    // Construct the new path with the new filename
    const newPath = `uploads/${newFilename}`;
    // Rename the file
    fs.renameSync(path, newPath);

    // Add the new filename to the array of uploaded files
    uploadedFiles.push(newFilename);
  }

  // Respond with an array of uploaded filenames
  res.json(uploadedFiles);


});
const photosMiddlewareUser = multer({ dest: 'UserPhoto/' });

app.post('/UserPhotos', photosMiddlewareUser.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const { path, originalname } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  // Generate new filename with extension
  const newFilename = `${Date.now()}.${ext}`;
  // Construct the new path with the new filename
  const newPath = `UserPhoto/${newFilename}`;
  // Rename the file
  fs.renameSync(path, newPath);

  // Respond with the uploaded filename
  res.json({ filename: newFilename });
});

app.post('/places', (req, res) => {
  mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');
  const { token } = req.cookies;
  const { title, address, Daddress, addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxGuests, price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      throw err; // Send response indicating token is invalid
    }
    const placeDoc = await Place.create({
      owner: userData.id,
      title, address, Daddress, photos: addedPhotos, description,
      perks, extraInfo, checkIn, checkOut, maxGuests, price,
    });
    res.json(placeDoc);

  });

})
app.get('/user-places', (req, res) => {
  mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});
app.put('/places', async (req, res) => {
  mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');
  const { token } = req.cookies;
  const {
    id, title, address, Daddress, addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxGuests, price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title, address, Daddress, photos: addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price,
      });
      await placeDoc.save();
      res.json('ok');
    }
  });
});
app.get('/user-places/:userId', async (req, res) => {
  const { token } = req.cookies;
  try {

    const places = await Place.find({ owner: req.params.userId });
    res.json(places);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

app.put('/places/:id', async (req, res) => {
  mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');
  try {
    const placeId = req.params.id;
    const { maxGuests } = req.body;

    // Find the place by ID and update the maxGuests field
    const updatedPlace = await Place.findByIdAndUpdate(placeId, { maxGuests }, { new: true });

    if (!updatedPlace) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // Return the updated place
    res.json(updatedPlace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/places/:id', async (req, res) => {
  mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');
  const { id } = req.params;
  res.json(await Place.findById(id));
});
app.get('/places', async (req, res) => {
  mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');
  res.json(await Place.find());
});

app.post("/bookings", async (req, res) => {
  mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;
  // Corrected variable name: numberOfGuests
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,

  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/bookings", async (req, res) => {
  mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');
  const userData = await getUserDataFromReq(req);
  const userBookings = await Booking.find({ user: userData.id, isSubmitted: true }).populate("place");

  // Return the user's bookings where isSubmitted is true
  res.json(userBookings);
});

app.put("/bookings/:id/submit", async (req, res) => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');

    // Get the booking ID from the request parameters
    const { id } = req.params;

    // Find the booking by ID and update the isSubmitted field to true
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: id }, // Match the booking by ID
      { isSubmitted: true }, // Update isSubmitted to true
      { new: true } // Return the updated document
    );

    // If the booking was not found
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Return the updated booking
    res.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/search", async (req, res) => {
  try {
    // Connect to MongoDB
    mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');

    // Extract query parameters from request
    const { destination, checkIn, checkOut } = req.query;

    // Construct search query based on query parameters
    const searchQuery = {};


    if (destination) {
      searchQuery.address = { $regex: destination, $options: 'i' };
    }
    // Optionally, add filtering based on check-in and check-out dates
    if (checkIn) {
      searchQuery.checkIn = checkIn;
    }
    if (checkOut) {
      searchQuery.checkOut = checkOut;
    }

    // Execute search query and return results
    const searchResults = await Place.find(searchQuery);
    res.json(searchResults);
  } catch (error) {
    console.error("Error processing search request:", error);
    res.status(500).json({ error: "An error occurred while processing the search request" });
  }
});

app.get('/places', async (req, res) => {
  mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');
  res.json(await Place.find());
});
