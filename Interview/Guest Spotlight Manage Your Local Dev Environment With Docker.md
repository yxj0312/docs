Maintaining a local Database management. for different version for differnt projects
- Using Docker, I can have mutiple version running at the same time

1. Create a account on dokcerhub.
2. Get Started->install Desktop
3. After installed, will be able to run docker command in terminal
4. In this example, we will instal a local MySQL server running version 5.7
5. Search mysql for mysql office docker images: ```docker pull mysql:5.7```
6. Check to make sure already in that image: ```docker images```
7. Follow the guide to use image: https://hub.docker.com/_/mysql

    7.1 ```docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:5.7```

    7.2 check if we have runing container: ```docker ps -a```

8. Access it from our machine:

    8.1 Delete the container we have runing:

    ```docker stop some-mysql // bringe the container down```

    ```docker rm some-mysql // remove the container```

    8.2 Add -p flag wiht port to

    which port we want to connect to in the container

    ```docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -d mysql:5.7```

    Now wo have a container in ports: 0.0.0.0:3306->3306

    8.3 Let's try to connect that port

    open up MySQL client, connect MySQL with local host

    - user: root, password:my-secret-pw(see above), port:3306

    8.4 create a new database call docker use it

    8.5 create a table called people with a varchar name, and create some data within

    8.6 stop this container with 
    
    ```docker stop some-mysql // bringe the container down```

    going back to our client, try to reconnect, it's not avaiable.

    8.7 let's go ahead, bringe the sever back up

    ```docker start some-mysql```

    reconnected, the data is still avaiable

    8.8 if we delete the container, the data its self will be gone

    Because the database is being stored in the file system, that we do not have direct access to, once I delete the system, it will also delete the data that we have stored in the database

    We can fix this by using a docker volume.

9. Docker volume

    Consider this as a virtual hard driver that you will attach to the container. Since the volume needs to be attached to the container, we going to destory the container we have created already, and bringe the new one with docker volume.


    ```docker
       docker stop some-mysql
       docker rm some-mysql
    ```

    create a docker volume
    ```docker
       docker volume create mysql_data
       docker volume ls
    ```

    add -v flage for docker volume by creating container, give our volume name, and tell it we gonna attach it with /var/lib/mysql

    ```docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -v mysql_data:/var/lib/mysql -p 3306:3306 -d mysql:5.7```

    the data we saved in the database back up.


    10. The real power behind docker is everything is containerized. This give the ability to run MySQL server 5.7 next to MySQL server 8
    
        10.1 pull down mysql 8 image
        
        ```
        docker pull mysql:8
        ```

        10.2 create a new docker volume use mysql 8

        ```
        docker volume create mysql8_data
        ```

        10.3 run container with changed name, ports etc.

        ```docker run --name some-mysql8 -e MYSQL_ROOT_PASSWORD=my-secret-pw -v mysql8_data:/var/lib/mysql -p 3307:3307 -d mysql:8```

        10.4 then we have two running container with mysql 8 and mysql 5.7

    11. You can do this to postgres servers. redis servers 


