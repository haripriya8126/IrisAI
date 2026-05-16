# IrisAI

**IrisAI** is a full-stack machine learning web application that classifies Iris flower species from sepal and petal measurements. It uses **React + Tailwind CSS** on the frontend and **Flask + scikit-learn** on the backend.

![Stack](https://img.shields.io/badge/React-18-61dafb)
![Stack](https://img.shields.io/badge/Flask-3-000000)
![Stack](https://img.shields.io/badge/scikit--learn-1.5-f7931e)

## Features

- Automatically loads the classic **Iris dataset** from scikit-learn
- Trains **Logistic Regression**, **Random Forest**, and **SVM** classifiers
- Compares model **test accuracies** and uses the best model for predictions
- Predicts species from four measurements with **confidence** and probability breakdown
- Interactive charts: **species distribution**, **feature importance**, **accuracy comparison**
- Modern **dark responsive UI** with loading states and error handling

## Project structure

```
CodeAlpha_IrisAI/
├── app.py                 # Flask API entry point
├── ml_service.py          # ML training & prediction logic
├── requirements.txt       # Python dependencies
├── package.json           # Root scripts (npm run dev)
├── frontend/              # React + Vite + Tailwind app
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api/client.js
│   │   └── components/
│   └── package.json
└── README.md
```

## Prerequisites

- **Python 3.10+**
- **Node.js 18+** and npm

## Quick start

### 1. Backend (Flask)

```bash
cd CodeAlpha_IrisAI

# Create and activate a virtual environment (recommended)
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python app.py
```

The API runs at **http://127.0.0.1:5001** (port 5001 avoids conflicts with other apps on 5000). Models train automatically on startup.

### 2. Frontend (React)

Open a **second terminal**:

```bash
cd CodeAlpha_IrisAI
npm install --prefix frontend
npm run dev
```

Open **http://localhost:5173** in your browser. Vite proxies `/api` requests to Flask.

## API endpoints

| Method | Endpoint        | Description                          |
|--------|-----------------|--------------------------------------|
| GET    | `/api/health`   | Health check                         |
| GET    | `/api/dashboard`| Charts data + model metrics          |
| POST   | `/api/predict`  | Classify from four measurements (cm) |

**Predict example:**

```json
POST /api/predict
{
  "sepal_length": 5.1,
  "sepal_width": 3.5,
  "petal_length": 1.4,
  "petal_width": 0.2
}
```

## Tech stack

| Layer      | Technologies                                      |
|-----------|---------------------------------------------------|
| Frontend  | React, Vite, Tailwind CSS, Recharts               |
| Backend   | Flask, Flask-CORS                                 |
| ML        | scikit-learn (Iris dataset, LR, RF, SVM)          |

## Resume / portfolio tips

- Deploy backend on [Render](https://render.com) or [Railway](https://railway.app) and frontend on [Vercel](https://vercel.com)
- Add screenshots to this README
- Mention test accuracy comparison and automatic best-model selection in interviews

## License

MIT — free to use for learning, internships, and portfolios.
