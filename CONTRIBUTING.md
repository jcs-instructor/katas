## Initial Setup

From the Terminal:
```
git clone [this repository name here]
cd [this repository name here]
yarn
yarn global add ts-node
yarn global add heroku
heroku login
git remote add heroku https://git.heroku.com/mobtimer1234.git 
```

## View the Deployed App in a Web Browser
https://mobtimer1234.herokuapp.com/ 

## Deploy
```
git push heroku main
```

## Run Unit Tests
```
yarn test
```

## Manually Test
Sample message to send via Postman:
```
{ "action": "join", "mobName": "amazing-folks" }
```
