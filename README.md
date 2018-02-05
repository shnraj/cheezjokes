# cheezjokes
App that lets people browse cheesy jokes

## DB
Using sqlite3 as a lightweight datastore for joke and vote data:
`brew install sqlite3`

#### Create database:
`sqlite3 database.db < schema.sql`

#### Query database:
`sqlite3 database.db`

## API
Using a python flask app to create a simple API:
`pip install flask`

#### Run the flask app:
`python cheezjokes_api.py`

To make it easier to grab the data from React, I hosted the flask app on PythonAnywhere at `http://shnraj.pythonanywhere.com/`
Example: `curl http://shnraj.pythonanywhere.com/jokes/20` will return 20 random jokes, with their vote counts, in json format

### Endpoints:

#### /jokes/<count>
Get random jokes

#### /jokes/best/<count>
Get best jokes sorted by vote count from highest to lowest

#### /jokes/worst/<count>
Get worst jokes sorted by vote count from lowest to highest

#### /joke/upvote/<joke_id>
Upvote a joke given joke id

#### /joke/downvote/<joke_id>
Downvote a joke given joke id

#### /jokes/add/<joke_id>
Add a hardcoded joke with a unique id to the db (used to test)

#### /
Populate jokes database with all jokes from API

## React App
I created a simple react app using [create-react-app](https://github.com/facebook/create-react-app/tree/master)

#### To run the react app:
`npm start`

I prefer to use sass for styling, webpack takes care of converting css -> sass with the following watcher
`npm run watch-css`