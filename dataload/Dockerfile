FROM mongo:3.6.22

COPY planets.json /planets.json

# seed json files into collections using a single CMD to make use of the shared docker compose bridged network to mongodb service
CMD ["sh", "-c", "mongoimport --host mongodb --db solar_objects --collection planets --type json --file /planets.json --jsonArray "]