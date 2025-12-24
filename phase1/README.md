
BeyondChats Phase 1 – Laravel + Docker

Steps:
1. Install Docker Desktop
2. docker-compose up --build
3. docker exec -it beyondchats_phase1-app php artisan migrate
4. POST http://localhost:8000/api/scrape
5. GET http://localhost:8000/api/articles
