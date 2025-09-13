from flask import Flask, render_template, request, jsonify
import requests
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

if not API_KEY:
    raise ValueError("No API key found in .env!")

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather')
def weather():
    city = request.args.get('city', '').strip()
    if not city:
        return jsonify({"error": "No city provided"}), 400

    try:
        url = "http://api.openweathermap.org/data/2.5/weather"
        params = {
            "q": city,
            "appid": API_KEY,
            "units": "metric"
        }
        response = requests.get(url, params=params)
        data = response.json()

        if response.status_code != 200:
            return jsonify({"error": data.get("message", "Unknown error")}), response.status_code

        return jsonify({
            "city": data["name"],
            "temp": round(data["main"]["temp"], 1),
            "desc": data["weather"][0]["description"].title(),
            "humidity": data["main"]["humidity"]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)