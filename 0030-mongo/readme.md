docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:latest


docker run --name mongodb -e MONGO_INITDB_DATABASE=mymongo -d -p 27017:27017 mongo:latest
