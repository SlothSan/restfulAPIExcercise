Reminders API Readme

Setup: 

Create a db in MongoDb called "reminders" 
Create a collection in the db called "reminders"
import the JSON file in the db folder in the repo into the "reminders" collection

Routes

POST  
/reminders  

adds reminders to the MongoDB if the data is supplied in the below format to the API.

    {
        "title": 'Do the dishes they are dirty', 
        "done": true
    }


returns a JSON body  

if task created the status code will be 200

    {
        "success": true, 
        "message": 'reminder created', 
        "data": []
    }
    
if invalid data provided the status code will be 400
    
    {
        "success": false, 
        "message": 'reminder not created due to invalid data', 
        "data": []
    }


PUT  
/reminders?id=<theidinquestion>

updates reminder that already exists in the DB to be done(true) or not done (false)

    {
        "done": boolean
    }

returns a JSON body

if task updated the status code will be 200
     
    {
        "success": true, 
        "message": 'reminder has been updated', 
        "data": []
    }

if the reminder has not been updated due to an invalid id the status code will be 400

    { 
        "success": false, 
        "message": 'Invalid ID provided', 
        "data": []
    }


DELETE

/reminders?id=<idofthedocumenttobedeleted>

deletes reminder that already exists in the DB.

    {
        "id":  'sdajdfaofhjar1341'
    }

returns a JSON Body.

if task deleted the status code will be 200

    {
        "success": true,
        "message": 'Reminder has been deleted',
        "data": []
    }
    
if an invalid id is provided the status code will be 400
    
    {
        "success": false,
        "message": "Invalid ID provided",
        "data": []
    }


GET

Route

    /reminders

gets all reminders and optionally can be filtered for done / not done reminders
    
    /reminders //Get all reminders
    /reminders/?done=true //Get all done reminders
    /reminders/?done=false //Get all reminders not yet done

send with an empty body to get all reminders, optionally add ?done=true/false to the end of the address to filter.

returns a JSON body of all documents in the DB that match if filtered or all Documents if not filtering.

    {
    "success": true,
    "message": "retreived all reminders",
    "data": [
        {
            "_id": "633eee9cdf17f4d65b93d48f",
            "title": "Do the dishes, they are well dirty mate!",
            "done": false
        },
        {
            "_id": "633f048c262c3890891445bd",
            "title": "Do Housework",
            "done": true
        },
        {
            "_id": "633f07ad9fca3cb8c1f197b7",
            "title": "Do More Housework Sigh!",
            "done": true
        }
    ]
}



