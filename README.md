# Voting System
 Voting system with all files neded to work.

 1. Create html or php file  vote.html or vote.php
 2. Create css               vote.css
 3. Create java script       vote.js

 4. Create a folder named "servers": Inside this folder, we'll create the backend (Node.js server) that handles server-side code and updates the database.
 5. Inside the "servers" folder, create "voteServer.js": This file will contain the backend code.

Before proceeding with the above steps, ensure that the following prerequisites are installed on your computer:
 A. NODE.JS    https://nodejs.org/en               This is for download and install express mysql cors AND body-parser

 B. XAMPP      https://www.apachefriends.org/      This is for database.

 6. Open your code editor and navigate to the project directory. Then, navigate to the previously created "servers" folder. 
 Install the required dependencies by running the following command in the terminal:
 Install these using terminal  <<  npm install express body-parser mysql cors  >>

 EXAMPLE:.A.            In your case be something simmilar.
    PS C:\xampp\htdocs\aldas\Voting-System> cd servers
    PS C:\xampp\htdocs\aldas\Voting-System\servers> npm install express body-parser

 EXAMPLE:.B.            In your case be something simmilar.
    added 66 packages in 1s
    12 packages are looking for funding
    run `npm fund` for details

7. To start server Type node voteServer.js  
EXAMPLE:.C.            In your case be something simmilar.
    PS C:\xampp\htdocs\aldas\Voting-System\servers> node voteServer.js
    Server is running on http://localhost:3000 


# Xampp database structure
Data Base name:    vote_database

INSIDE this DataBase is table:  user_votes

This table has:  
1. id_of_vote             int(11) 	AUTO_INCREMENT	
2. name                   varchar(255)
3. vote_count	           int(11)
4. plus	                 tinyint(1)	
5. minus        	        tinyint(1)	
6. created_at             timestamp   current_timestamp()	