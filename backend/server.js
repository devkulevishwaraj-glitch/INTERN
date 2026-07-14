require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const e = require('express');

console.log(process.env.MONGO_URI);

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/health', (req, res) => {
    res.json({
         status: 'ok', 
         message: 'Attendance Management System API is running'
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Attendance Management System API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

