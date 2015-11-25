Boilerplate web boli

to make components first class we use 
```
cd {project_root}/node_modules
ln -s ../lib _
```
To start the sever in dev mode.
```
npm start

```


To set in prod mode, set env var NODE_ENV=production and will load the production config in the json file 
```
lib/config/env/production.json
```