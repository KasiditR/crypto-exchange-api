# crypto-exchange-api

```bash
# install node_modules
npm install

# pull mysql docker image
docker run --name vr_test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_USER=vr_test -e MYSQL_PASSWORD=123456 -e MYSQL_DATABASE=vr_test -d mysql:latest

# start API
npm run start