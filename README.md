# Admere-Internship

The task was to create 5 routes for an api. 
1. Register route for Shopkeeper in which ii took shopkeepers name,shopname,mobileno and password. I stored all this data in mongodb.The password can be encrypted using bcrypt to increase user security.
2. Register route for user in which I took their First name,last name , username and password.
3. The login route for a shopkeeper uses their mobile no as thier username and password for their login credentials used findOne method of mongoose to check whether user is present in the database.
4. The login route for a user uses their username and password as their credentials. 
5. The get route uses basic mongoose comand to get all the items from database known as List.The data return will contain a data in json format with its contents price,description and title.
6. I was not sure from the document recived whether to make the get request display data from the database or create a json object in the code. I have put the code in commnets which display data from mongodb. 
The approach was to make as simple and clean function that will  be easy to read and to implement . I first read mongodb documentation and look at the code from my previous projects.
    
The sample images which show my codes work are uploaded to a image directory.
