
Phase 2 – NodeJS Article Enhancement Pipeline

Steps:
1. Make sure Phase 1 Laravel API is running on port 8000
2. Set environment variable:
   OPENAI_API_KEY=your_key_here
3. Build & run using Docker:
   docker build -t phase2-node .
   docker run --network=host phase2-node
