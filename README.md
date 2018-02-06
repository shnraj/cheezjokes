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

`/jokes/<count>`
Get random jokes

`/jokes/best/<count>`
Get best jokes sorted by vote count from highest to lowest

`/jokes/worst/<count>`
Get worst jokes sorted by vote count from lowest to highest

`/joke/upvote/<joke_id>`
Upvote a joke given joke id

`/joke/downvote/<joke_id>`
Downvote a joke given joke id

#### Extra
`/jokes/add/<joke_id>`
Add a hardcoded joke with a unique id to the db (used to test)

`/`
Populate jokes database with all jokes from API

## React App
I created a simple react app using [create-react-app](https://github.com/facebook/create-react-app/tree/master) 

There are three main components: App.js, JokeList.js, and Joke.js.

#### To run the react app:
`npm start`

I prefer to use sass for styling, webpack takes care of converting css -> sass with the following watcher
`npm run watch-css`
All the styling is in a single sass app for now, since the app is simple.

## To Do
With more time I would do the following:
* **Unittests** I would like to mock the sqlite db and write some python unit tests for each of the flask endpoints.
* **Address unicode** The app currently doesn't handle unicode from the jokes API well.
* **Auto-refresh lists** Best and worst lists should automatically refresh when a joke that was voted on in the random list enters the top or bottom 5.
* **Hosting react app** I've been meaning to check out deploying react apps with [Now.sh](https://zeit.co/now).
* **Caching** I'm familiar with local storage caching but didn’t have enough time to get to it. I explain how I would use local storage below.
* **Only voting on each joke once** I would add a new votedOn object to state that would contain the keys of all the jokes the user has voted on. I would cache this object in local storage by using `localStorage.setItem('votedOn', JSON.stringify(nextState.votedOn))` in componentWillUpdate. I would JSON.parse the reference in localStorage to set the votedOn state in componentWillMount. When rendering the jokes, I would disable jokes that are in votedOn.
* **Add your own joke** I have the api functionality for this, I want to add a simple form to the website to add a joke, would probably create a unique id by using the timestamp.
