# UI for Zappos


### Build UI


```bash
npm i
npm i webpack -g
webpack
webpack --watch --watch-poll # for dev
```


### Build API


Set `API_URL` env to your API.
Set `IMAGES_PATH` env to your images.


```bash
npm i
API_URL=https://bb30881c-d76e-40e0-b6cd-cfceaf9a0258.dev.kuberlab.io/ IMAGES_PATH=~/Downloads/ut-zap50k-images node index.js # run 
server
```


Open `localhost:8888`.
