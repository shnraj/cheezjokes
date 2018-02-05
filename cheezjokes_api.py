import sqlite3
import requests
import json
from flask import Flask
from flask import jsonify
from collections import OrderedDict

app = Flask(__name__)
# jsonify sorts keys in alphabetical order by default, we want it sorted by vote count
app.config['JSON_SORT_KEYS'] = False

DB = 'database.db'

def connect():
    """ Make connection to an SQLite database file """
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    return conn, c

def close(conn):
    """ Commit changes and close connection to the database """
    conn.commit()
    conn.close()

@app.route('/')
def populate_table():
    for page in range(1, 15):
        params = {'page': page}
        headers = {'Content-type': 'application/json', 'Accept': 'application/json'}
        response = requests.get("https://icanhazdadjoke.com/search", params=params, headers=headers)
        joke_list = json.loads(response.text)['results']
        print joke_list
        conn, c = connect()
        for joke in joke_list:
            id = joke['id']
            joke_text = joke['joke']
            c.execute("INSERT INTO jokes VALUES (?, ?, ?)", (id, joke_text, 0))
        close(conn)
    return get_random_jokes('20')

def format_data(data_array):
    """ Format jokes data from query into json """
    result = OrderedDict()
    for joke in data_array:
        result[joke[0]] = {'joke': joke[1], 'votes': joke[2]}
    return jsonify(result)

# To test the db setup
@app.route('/jokes/add/<joke_id>')
def add_joke(joke_id):
    conn, c = connect()
    c.execute("INSERT INTO jokes VALUES ('" + joke_id + "','is a joke', 0)")
    close(conn)
    return get_random_jokes('20')

@app.route('/jokes/<count>')
def get_random_jokes(count):
    """ Grab a certain number of random jokes from the db and return data in json """
    conn, c = connect()
    c.execute('SELECT * FROM jokes ORDER BY RANDOM() LIMIT ' + count + '')
    data = format_data(c.fetchall())
    conn.close()
    return data

@app.route('/jokes/best/<count>')
def get_best_jokes(count):
    conn, c = connect()
    c.execute('SELECT * FROM jokes ORDER BY votes DESC LIMIT ' + count + '')
    data = format_data(c.fetchall())
    conn.close()
    return data

@app.route('/jokes/worst/<count>')
def get_worst_jokes(count):
    conn, c = connect()
    c.execute('SELECT * FROM jokes ORDER BY votes LIMIT ' + count + '')
    data = format_data(c.fetchall())
    conn.close()
    return data

@app.route('/joke/upvote/<joke_id>')
def upvote_joke(joke_id):
    print joke_id
    conn, c = connect()
    c.execute("UPDATE jokes SET votes = votes + 1 WHERE id = " + joke_id + "")
    conn.commit()
    c.execute("SELECT * FROM jokes WHERE id = " + joke_id + "")
    data = format_data(c.fetchall())
    conn.close()
    return data

@app.route('/joke/downvote/<joke_id>')
def downvote_joke(joke_id):
    conn, c = connect()
    c.execute("UPDATE jokes SET votes = votes - 1 WHERE id = " + joke_id + "")
    conn.commit()
    c.execute("SELECT * FROM jokes WHERE id = " + joke_id + "")
    data = format_data(c.fetchall())
    conn.close()
    return data

if __name__ == "__main__":
    app.run(debug=True)
