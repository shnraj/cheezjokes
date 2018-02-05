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

### Endpoints:
#### /jokes/add/<joke_id>
Add a hardcoded joke with a unique id to the db (used to test)

#### /jokes/<count>
Get random jokes
