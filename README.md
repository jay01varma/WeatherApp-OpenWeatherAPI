# Weather App

A modern, beautiful weather web application built with Flask, HTML, CSS, and JavaScript. Instantly check the current weather and forecast for any city in the world with a clean, responsive interface.

---

## ✨ Features

- **Live Weather:** Get real-time weather data for any city.
- **Responsive Design:** Looks great on desktop and mobile.
- **Aesthetically Pleasing UI:** Soft gradients, glassmorphism, and subtle animations.
- **Easy Search:** Just type a city and hit Enter or click Search.
- **Error Handling:** Friendly messages for invalid cities or network issues.

---

## 🗂️ Project Structure

```
Weather App/
├── app.py                  # Main Flask backend
├── requirements.txt        # Python dependencies
├── Procfile                # For deployment (optional)
├── static/
│   ├── style.css           # Custom styles
│   └── script.js           # Frontend JS logic
├── templates/
│   └── index.html          # Main HTML template
└── README.md               # This file
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

### 2. Install Dependencies

Make sure you have Python 3.8+ installed.

```bash
pip install -r requirements.txt
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your weather API key:

```
WEATHER_API_KEY=your_openweathermap_api_key
```

### 4. Run the App Locally

```bash
export FLASK_APP=app.py
export FLASK_ENV=development  # Optional: enables debug mode
flask run
```

Visit [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

---

## 🌐 Deploying Online (Free)

### Deploy on [Render](https://render.com) (Recommended)

1. **Push your code to GitHub.**
2. **Sign up at [render.com](https://render.com).**
3. **Create a new Web Service** and connect your GitHub repo.
4. **Set the Start Command:**  
   ```
   gunicorn app:app
   ```
5. **Add your environment variable** (`WEATHER_API_KEY`) in the Render dashboard.
6. **Deploy!**  
   Render will give you a public URL.

### Other Options

- [Railway](https://railway.app) (very similar process)
- [Fly.io](https://fly.io)
- [Heroku](https://heroku.com) (may require credit card for free tier)

> **Note:** GitHub Pages only supports static sites. For Flask apps, use Render, Railway, etc.

---

## 🛠️ Customization

- **Change the look:** Edit `static/style.css` for colors, fonts, and layout.
- **Add features:** Modify `app.py` and `static/script.js` for more weather details or new APIs.
- **Update icons:** Use your own SVGs or icon sets for weather conditions.

---

## 📦 Dependencies

- Flask
- requests
- python-dotenv
- gunicorn (for deployment)
- See `requirements.txt` for full list

---

## 📄 License

MIT License

---

## 🙋‍♂️ Author

- **Jay Dilip Varma**
- jay01varma@gmail.com(mailto:jay01varma@gmail.com)
- GitHub(https://github.com/jay01varma)

---
