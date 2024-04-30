// db.js
import mongoose from "mongoose";

mongoose.connect('mongodb+srv://tourista:Tourista123@tourista.jjdaipo.mongodb.net/?retryWrites=true&w=majority&appName=Tourista');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

export default db;
