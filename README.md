# Parser RSS ленты + Admin UI

#### Описание задачи
<details>
  
- Реализовать на NodeJS/Laravel Parser RSS ленты(например https://lifehacker.com/rss можно выбрать на ваше усмотрение) по cron task(или с помощью worker будет плюсом). Новые публикации должны будут сохранены в БД в таблице 'posts'.
- Создать CRUD для Posts -- REST API( или GraphQL API) !!! Поиск, пагинация, сортировка, фильтрация !!! 
- Создать Admin UI SPA(на выбор React/Vue/Angular2) по управлению записями в виде списка с пагинацией, возможностью сортировки и поиска. 
- В Admin UI так же должна быть реализована возможность создания, редактирования и удаления постов
- Закрыть доступ к  Admin UI с помощью HTTP Basic Auth (плюсом будет реализовать JWT Auth).
- Создать Public GitHub(Gitlab etc.) репозиторий. Выложить код. Выслать ссылку
  
</details>

#### Env variables
<details>
 Put .env file in root folder
  
```
MONGODB_USERNAME= dbuser
MONGODB_PASSWORD= dbpassword
MONGODB_DATABASE_NAME= dbname
VITE_API_HOST=api server hostname (i.e http://localhost:3000)
MONGODB_URI= Url to mongo db

RSS_POLLING_TIME= Time in msec for how fast to check rss feed

Register at cloudinary.com to recieve this data
CLOUD_NAME= 
CLOUD_FOLDER= 
CLOUDINARY_API_KEY= 
CLOUDINARY_API_SECRET= 

JWT_SECRET= Secret for signing jwt token
ACCESS_TOKEN_EXP= access token exp time in msec
REFRESH_TOKEN_EXP= refresh token exp time in msec

PORT=80 client port
```
</details>

#### Building app
```
docker-compose build
```

#### Starting app
```
docker-compose up
```

#### Development mode
configure .env file and put it inside backend folder
```
npm install
docker-compose up mongo
npm run dev
```

#### Initial data
Since it's a test project, it doesn't have register enpoint for adding users. To add initial user data go to db folder and import user.json to mongo db using mongo compass or by other means
```
  login: admin
  password: 123456789
```
```
  login: user12345
  password: 123456789
```


#### API Documentation
[Swagger](https://app.swaggerhub.com/apis-docs/ferka123/RSSFeed/1.0)

#### Deployed app
[Railway.app](https://app.swaggerhub.com/apis-docs/ferka123/RSSFeed/1.0)