const express = require('express');
const app = express();
const port = 3000;
const url = 'mongodb://root:password@localhost:27017';
const dbName = 'reminders';
const collectionName = 'reminders';
const ObjectId = require('mongodb').ObjectId
const createDbConnection = require('./dbConnect');
app.use(express.json());

//GET Route for all!
app.get('/reminders', async (req, res) => {
    const collection = await createDbConnection(url, dbName, collectionName);
    if(req.query.done === 'true') {
        const reminders = await collection.find({done: true}).toArray();
        res.status(200).json({success: true, message: "Retrieved all reminders that done is true", data: reminders});
    } else if (req.query.done === 'false') {
        const reminders = await collection.find({done: false}).toArray();
        res.status(200).json({success: true, message: "Retrieved all reminders that done is false", data: reminders});
    } else {
        const reminders = await collection.find({}).toArray();
        res.status(200).json({success: true, message: 'retrieved all reminders', data: reminders});
    }
})

app.post('/reminders', async (req, res) => {
    if(req.body.title === undefined ||
        req.body.done === undefined ||
        typeof req.body.title !== 'string' ||
        req.body.title.length > 500 ||
        req.body.title.length === 0 ||
        typeof req.body.done !== "boolean") {
        res.status(400).json({success: false, message: "Invalid data provided", data: []})
    }
    const collection = await createDbConnection(url, dbName, collectionName);
    const newReminderData = {
        title: req.body.title,
        done: req.body.done
    };
    await collection.insertOne(newReminderData);
    res.status(200).json({success: true, message: "Successfully created reminder", data: []});
});

app.put('/reminders', async (req, res) => {
    if(req.body.done === undefined ||
        req.query.id === undefined ||
        typeof req.body.done !== "boolean") {
        res.status(400).json({success: false, message: "invalid data provided", data: []})
    }
    const collection = await createDbConnection(url, dbName, collectionName);
    try {
        const objectId = ObjectId(req.query.id);
        await collection.updateOne({_id: objectId}, {$set: {done: req.body.done}})
        res.status(200).json({success: true, message: "updated the document with the id of " + objectId, data: []});
    } catch {
        res.status(400).json({success: false, message: "invalid data provided", data: []})
    }
})

app.delete('/reminders', async (req, res) => {
    if(req.query.id === undefined) {
        res.status(400).json({success: true, message: "Invalid data provided", data: []})
    }
    const collection = await createDbConnection(url, dbName, collectionName);
    try {
        const objectId = ObjectId(req.query.id);
        await collection.deleteOne({_id: objectId});
        res.status(200).json({success: true, message: "deleted the document with the id of " + objectId, data: []});
    } catch {
        res.status(400).json({success: true, message: "Invalid data provided", data: []})
    }
})

app.listen(port);
