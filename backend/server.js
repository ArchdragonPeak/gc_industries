const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const passwordFilePath = path.join(__dirname, 'dbpassword.config');
const pass = fs.readFileSync(passwordFilePath, 'utf8').trim();
const uri = `mongodb+srv://gcindustries:${pass}@uebung2.c6giab7.mongodb.net/?retryWrites=true&w=majority&appName=uebung2`;

const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const gameRoutes = require('./routes/gameRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/games', gameRoutes);
app.use('/comments', commentRoutes);
app.use('/users', userRoutes);

async function run() {
    try {
        await mongoose.connect(uri, clientOptions);
        console.log('Connected to MongoDB!');
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

run();