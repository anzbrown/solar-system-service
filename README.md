# Solar system service

[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/anzbrown/solar-system-service/Node.js%20CI/main?style=for-the-badge)](https://github.com/anzbrown/solar-system-service/actions?query=workflow%3A%22Node.js+CI%22%22+branch%3Amain+)
[![Codecov branch](https://img.shields.io/codecov/c/github/anzbrown/solar-system-service/main?style=for-the-badge)](https://codecov.io/gh/anzbrown/solar-system-service)

This service will provide detailed information about the solar system based on data scraped from NASA's Jet Propulsion
Laboratory, [NASA sun facts](https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html) and data provided by
[devstronomy](https://devstronomy.com/#/datasets#downloads).

## Running the project
### Pre-requisite
This project requires `docker` and `docker-compose` to be installed for running a mongoDB and NodeJS container runtime.


To start the project, in a terminal window run:
```
docker-compose up --build
```
This will startup a MongoDB service for storing the solar system information, a second Mongo service to seed the `planets` 
and `satellites` collections from the NASA json files, and finally a NodeJS 14 Express App to serve as the REST API.

In another terminal window, run:
```
docker inspect solar-system-service
```
Copy the `IP Address` value and open the url `http://<ipaddress>:8080/api-docs`, e.g.: `http://172.18.0.4:8080/api-docs`.

This page displays the swagger API docs with runnable examples of each of the endpoints in the project, along with
detailed request and response information. This includes example request bodies for the POST endpoint, detailed information
on each of the HTTP status response values.
