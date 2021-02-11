# Solar system service

[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/anzbrown/solar-system-service/Node.js%20CI/main?style=for-the-badge)](https://github.com/anzbrown/solar-system-service/actions?query=workflow%3A%22Node.js+CI%22%22+branch%3Amain+)
[![Codecov branch](https://img.shields.io/codecov/c/github/anzbrown/solar-system-service/main?style=for-the-badge)](https://codecov.io/gh/anzbrown/solar-system-service)

This service will provide detailed information about the solar system based on data scraped from NASA's Jet Propulsion
Laboratory and provided by [devstronomy](https://devstronomy.com/#/datasets#downloads).

## Development
To start the project run:
```
docker-compose up --build
```
This will startup a MongoDB service for storing the solar system information, a second Mongo service to seed the `planets` 
and `satellites` collections from the NASA json files, and finally a NodeJS 14 Express App to serve as the REST API.