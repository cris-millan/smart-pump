How to run api

1. Run `npm install`
2. Run `npm run dev`
3. the following endpoints are availables:
POST `localhost:3000/api/auth`
BODY {
    "email": "henderson.briggs@geeknet.net",
    "password": "23derd*334"
}


use the token from auth response to call the following endpoints:
Get `localhost:3000/api/auth/profile/token`
Body N/a

Patch `localhost:3000/api/auth/profile/token`
BODY {
    "email": "henderson.briggs@geeknet.net",
    "password": "23derd*334"
}

How to run the frontend.

4. npm 

5. Go to the frontend directory and run the following command: npm start. It will ask you if you want to run on another port; answer "yes" and it will run on port 3001.

5. Open Google Chrome and go to the following URL: `http://localhost:3001/`


notes: 

i have problems wiht lowdb (DB), i used  node-json-db instead.