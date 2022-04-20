import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA2ssqz9_G3TkJX52I1YWzNHNdl3RgdnWw',
  authDomain: 'gardage-classification.firebaseapp.com',
  databaseURL: 'https://gardage-classification-default-rtdb.firebaseio.com',
  projectId: 'gardage-classification',
  storageBucket: 'gardage-classification.appspot.com',
  messagingSenderId: '114265342550',
  appId: '1:114265342550:web:6810f8a0804b2c18eff1f7',
  measurementId: 'G-K00SBXW63K',
};

// Initialize Firebase
const firbaseApp = initializeApp(firebaseConfig);
// Get a reference to the database service
const db = getDatabase(firbaseApp);

const starCountRef = ref(db, '/garbage/category/');

import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';

const __dirname = path.resolve();
const app = express();
const httpServer = createServer(app);
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(4000);
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('connected');

  onValue(starCountRef, (snapshot) => {
    const object = snapshot.val();
    console.log(object);
    console.log('send updated data');
    socket.emit('sendData', object);
  });
});
