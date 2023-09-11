<h1 align="center">Welcome to the Leaderboard project 👋</h1>

## 🤔 Problem
How do people become good at something ? By doing it regularly, right ? That's why this project aims to help all the students in practicing programming regularly by maintaining a leaderboard. The website will be have **4 different leaderboards**

## ✨ Features
- LeaderBoard Website + Django backend to collect data from different sources( APIs and web scraping )
- Leaderboard type 1 : Github profile activeness (based on commits/stars etc.)
- Leaderboard type 2 : OpenLake contributions (based on commits/pull requests etc.)
- Leaderboard type 3 : Codechef ranking
- Leaderboard type 4 : Codeforces ranking
- Students will get notified(through email) whenever their rank is decreasing (because they aren't active)
- Our metrics will promote consistent work instead of bulk work at once.
- Tech Stack : React, Django, PostgreSQL

## Setup instrunctions
- Install `pnpm`, `python3.7` and `Make` in your system
- Run the following commands in the same order:
    ```
    make install
    make migrate
    make dev
    ```
- Visit http://localhost:8000/ and http://localhost:3000/
