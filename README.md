# Beact
use react to create audio/visual in a creative way.

##dev mode

### To start and run

First, clone the repo.
```
git clone https://github.com/vibertthio/beact
```

* Then install the dependencies:

```
npm install
```

### To build the production package

```
npm run build
```

##server mode

###To install mongodb

```
brew install mongo
```

###Initial config of mongodb

Create database directory
```
sudo mkdir -p /data/db
```
Find your username
```	
whoami
```
Taking ownership to /data/db
```	
// assume your username is John
sudo chown -Rv John /data/db
```	
###To run the database

```
mongod
```

If you don't want to run mongod everytime you need, the following command will automatically start your database while the computer is running:

```
brew services start mongo
```

### To build the production package

```
npm run build
```
### To run the server

```
npm run server
```

	
