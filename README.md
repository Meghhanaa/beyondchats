# BeyondChats – Full Stack Assignment

This repository contains a complete multi-phase full stack assignment implemented using **Laravel**, **Node.js**, and **React.js**, following a clean API-driven architecture.

The project is divided into **three phases**:

- **Phase 1**: Laravel-based REST APIs for articles
- **Phase 2**: Node.js automation script using Google Search + LLM
- **Phase 3**: React.js frontend to display articles

Each phase is independent but connected through APIs.

---

##  Tech Stack Used

- **Backend (Phase 1)**: Laravel, PHP, MySQL, Docker
- **Automation (Phase 2)**: Node.js, Axios, Cheerio, Google Search, OpenAI API
- **Frontend (Phase 3)**: React.js, Vite, Axios, CSS
- **Infrastructure**: Docker & Docker Compose

---

##  Project Structure

beyondchats/
│

├── phase1/ # Laravel Backend APIs

│ ├── backend/

│ ├── docker-compose.yml

│

├── phase2/ # Node.js Automation Script

│ ├── index.js

│ ├── Dockerfile

│

├── phase3/ # React Frontend

│ ├── src/

│ ├── vite.config.js

│

└── README.md


---

#  PHASE 1 – Laravel Backend APIs

##  Objective
Create REST APIs to manage articles that will later be consumed by automation scripts and frontend UI.

---

##  APIs Implemented

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/articles` | Fetch all articles |
| GET | `/api/articles/{id}` | Fetch single article |
| POST | `/api/articles` | Create new article |
| DELETE | `/api/articles/{id}` | Delete article |
| POST | `/api/scrape` | Scrape content from a URL |

---

##  How to Run Phase 1 (Docker)

### Step 1: Go to Phase 1 directory

cd phase1


---

#  PHASE 1 – Laravel Backend APIs

##  Objective
Create REST APIs to manage articles that will later be consumed by automation scripts and frontend UI.

---

##  APIs Implemented

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/articles` | Fetch all articles |
| GET | `/api/articles/{id}` | Fetch single article |
| POST | `/api/articles` | Create new article |
| DELETE | `/api/articles/{id}` | Delete article |
| POST | `/api/scrape` | Scrape content from a URL |

---

##  How to Run Phase 1 (Docker)

### Step 1: Go to Phase 1 directory
cd phase1


### Step 2: Start containers
docker compose up -d --build

### Step 3: Generate app key
docker exec -it phase1-app php artisan key:generate

###  Step 4: Run migrations
docker exec -it phase1-app php artisan migrate

### Step 5: (Optional) Seed sample article
docker exec -it phase1-app php artisan db:seed --class=ArticleSeeder

### Step 6: Verify API
curl http://localhost:8000/api/articles


###  Phase 1 runs on:
http://localhost:8000

#  PHASE 2 – Node.js Automation Script

##  Objective
Automatically enhance articles by:
1. Fetching the latest article from Laravel
2. Searching Google for similar ranking articles
3. Scraping reference content
4. Using an LLM to rewrite the article
5. Publishing the updated article back via APIs

---

##  Workflow
1. Fetch latest article from Laravel API  
2. Search article title on Google  
3. Extract top 2 blog/article links  
4. Scrape their main content  
5. Rewrite original article using LLM  
6. Append references  
7. Publish updated article using Laravel API  

---

##  How to Run Phase 2

### Step 1: Go to Phase 2 directory
cd phase2
### Step 2: Build Docker image
docker build -t phase2-node .
### Step 3: Run script (API key via environment variable)

docker run -e OPENAI_API_KEY=your_api_key_here phase2-node

### Note
If OpenAI quota is exceeded, the script will fail gracefully.

Billing is optional — Phase 2 logic works until API limits are reached.



#  PHASE 3 – React Frontend

##  Objective
Create a responsive, professional UI that displays:
1. Original articles
2. Updated/generated articles

---

##  Frontend Features
1. Fetches data from Laravel APIs  
2. Responsive article cards  
3. Clean, minimal UI  
4. Error handling for network issues  

---

##  Phase 3 Structure
src/

├── api/

│   └── articlesApi.js

├── components/

│   ├── ArticleCard.jsx

│   ├── ArticleList.jsx

│   └── Navbar.jsx

├── styles/

│   └── styles.css

├── App.jsx

└── main.jsx

 How to Run Phase 3
### Step 1: Go to Phase 3 directory
cd phase3

### Step 2: Install dependencies
npm install

### Step 3: Start development server

npm run dev

### Step 4: Open in browser

http://localhost:5173

prerequisite
Ensure Phase 1 backend is running before starting Phase 3.

 Environment & Security
API keys are never hardcoded

Secrets are passed via environment variables

.env and node_modules are git-ignored

GitHub Push Protection compliance ensured

 Common Issues & Fixes

API not loading?

✔ Ensure Docker containers are running

✔ Check using docker ps

✔ Backend must be accessible on port 8000

Network error in React?

✔ Laravel backend must be running

✔ CORS must be enabled in Laravel

🏁 Final Status

✔ Phase 1 – Completed

✔ Phase 2 – Completed

✔ Phase 3 – Completed

✔ Dockerized

✔ Production-ready structure

##  Author
# Meghana Tamrakar
## NIT BHOPAL
## BeyondChats Assignment Submission
