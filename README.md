# ASQ-API_v1
Back end project creating a web app forum
This will be a simple web application that allows users to post questions, then allows other users to post answers to questions. Both questions and answers may be “liked” by users.

# DEVELOPERS
- Yesenia Callejas
- Esteban Munoz

# Hints
- You can search for questions using the query {reference: undefined}. This will also find documents that don’t have a reference field.
- Remember that you can use the second field of the find method to specify what fields of the object you want back.
- Remember that Date.now() returns the current date/time.
- Make separate parameter handlers for questionid and answerid. They are both looking up posts from the database, but one should only accept questions, and the other should only accept answers.
- Make functions for generating common responses, such as 404 and 405.
- Make an Express error handler that takes all exceptions, then figures out if they were 400s or 500s.
- Catch all exceptions and hand them off to express.
- Use router.route(...) to define each end point. You can add a .all option to the end to catch unsupported methods.

# Dependencies (Node Packages used)
----------------
- "body-parser": "^1.20.2",
- "express": "^4.18.3",
- "express-handlebars": "^7.1.2",
- "express-session": "^1.18.0",
- "mongoose": "^8.2.2",
- "morgan": "^1.10.0"
# Dev Dependencies
- "jest": "^29.7.0",
- "nodemon": "^3.1.0",
- "winston": "^3.12.0"
  
