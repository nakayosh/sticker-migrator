## Update
```
docker-compose build web \
&& docker-compose run --rm web ash -c "composer install --no-progress \
 && yarn install --pure-lockfile \
 && yarn run clear \
 && yarn run prod"
```
