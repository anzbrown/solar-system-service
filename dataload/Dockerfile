FROM mongo:3.6.22

COPY planets.json /planets.json
COPY satellites.json /satellites.json

CMD mongoimport --host mongodb --db solar_objects --collection planets --type json --file /planets.json --jsonArray
CMD mongoimport --host mongodb --db solar_objects --collection satellites --type json --file /satellites.json --jsonArray