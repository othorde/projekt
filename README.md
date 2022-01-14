
[![CircleCI](https://circleci.com/gh/othorde/projekt.svg?style=svg)](https://circleci.com/gh/othorde/projekt)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/othorde/projekt/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/othorde/projekt/?branch=main)


# Projekt

Detta är en del av ett grupparbete i kursen pattern på Blekinge Tekniska Högskola.
Denna del består av admin och användarens webbgränssnitt.

# Hela systemet

Kan hämtas genom docker

## Hämta
Webbklient: 
docker-compose pull othordeman/projekt:latest

Server:
docker-compose pull alexander97olsson/api_server

App:
docker-compose pull jontepson/app:latest

Simulation/cykel:
docker-compose pull johannapersson123/simulation:latest

## docker-compose.yml

[https://drive.google.com/file/d/1SMhEPOr0hLStIhgTGTvMLBNN19QvtGiz/view?usp=sharing]

## Kör

docker-compose up

## Stäng ner

docker-compose down

# Endast webbklient

## Ladda ner

Ladda ner repot från github.
För att allt ska fungera behövs API nyckel för google maps som ej är inkluderat i nedladdningen.
Den ska läggas till som REACT_APP_GOOGLE_MAPS_API_KEY="DIN API NYCKEL" i .env filen.

## Installera

Installera allt med "npm install"


### Starta

Starta klienten genom "npm start"

Klienten körs på 
[http://localhost:3000](http://localhost:3000).


### Testa

Kör tester genom "npm run test"


