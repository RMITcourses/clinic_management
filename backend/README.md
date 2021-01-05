# Frontend: 

## Notes: cloud API is outdated, please used only local API

    http://sadi-app.s3-website.us-east-2.amazonaws.com/

Username: doctor
Password: 1

To test this application at local:
- Frontend: npm i && npm run dev (change api url to localhost:8080)
- Backend: mvn jetty:run
- Import csv file from resources folder( backend/src/main/resources) into database ( please copy content of insert.txt file and use query tools of pgAdmin to query)       

The backend API at local is : 

    http://localhost:8080

If test it on Ubuntu server database, please change it to:
    
    http://165.22.249.19:8081/sadi-1.0-SNAPSHOT