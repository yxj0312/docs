# The Difference Between MySQL Join Types

> If the various MySQL join types confuse you, don't worry: you're not the only one. Inner Join, Outer Join, Left Join, Right Join...what the heck? But, as it turns out, once you understand the basic structure of a join, everything else should quickly fall into place. In this episode, we'll review everything you need to know.

## Example

1. Join store with address table

    ```MySQL
    SELECT *
    FROM store
    JOIN address
    ON store.address_id = address.address_id
    ```

    This code means: on is a condition.

    Select everything from store table but join the address table, on the condition: store.address_id = address.address_id

2. Inner join: identical with join in MySQL, only give the result where there are some matchers on both tables

3. Left/right join

    ```MySQL
    SELECT *
    FROM store
    [INNER/LEFT/RIGHT] JOIN address
    ON store.address_id = address.address_id
    ```

    With this query is saying: on the condition, that there is no match, what should I do?

    - Inner join: forget it, discard entirely.
    - Left join: on the condition there is no match, I want to favor the left side (in this query, it is store table): So if there is no match, favor the store table, I alway want to see every records of the store table.
    - Right join: we switch it, if there is no match favor the right side of the joined table, which is address here.
    - Left join and left outer join are the same thing

## Exercises 1

[SQLZOO](https://sqlzoo.net/wiki/The_JOIN_operation)

game

| id   | mdate        | stadium                   |team1|team2|
|------|--------------|---------------------------|-----|-----|
| 1001 | 8 June 2012  | National Stadium, Warsaw  | POL | GRE |
| 1002 | 8 June 2012  | Stadion Miejski (Wroclaw) | RUS | CZE |
| 1003 | 12 June 2012 | Stadion Miejski (Wroclaw) | GRE | CZE |
| 1004 | 12 June 2012 | National Stadium, Warsaw  | POL | RUS |
|...                                                        |

goal

| matchid | teamid | player               | gtime |
|---------|--------|----------------------|-------|
| 1001    | POL    | Robert Lewandowski   | 17    |
| 1001    | GRE    | Dimitris Salpingidis | 51    |
| 1002    | RUS    | Alan Dzagoev         | 15    |
| 1002    | RUS    | Roman Pavlyuchenko   | 82    |
|...                                              |

eteam

| id  | teamname       | coach            | gtime | GRE |
|-----|----------------|------------------|-------|-----|
| POL | Poland         | Franciszek Smuda | 17    | CZE |
| RUS | Russia         | Dick Advocaat    | 51    | CZE |
| CZE | Czech Republic | Michal Bilek     | 15    | RUS |
| GRE | Greece         | Fernando Santos  | 82    |     |
| ... |                |                  |       |     |

1. show the matchid and player name for all goals scored by Germany. To identify German players, check for: teamid = 'GER'

    ```SQL
    SELECT matchid, player FROM goal
        WHERE teamid = 'GER'
    ```

2. Show id, stadium, team1, team2 for just game 1012

   ```SQL
    SELECT id,stadium,team1,team2
        FROM game where id=1012
    ```

3. You can combine the two steps into a single query with a JOIN. Show the player, teamid, stadium and mdate for every German goal.

    ```sql
    SELECT player,stadium, teamid, mdate
    FROM game JOIN goal ON (id=matchid)
    WHERE teamid='GER'
    ```

4. Show the team1, team2 and player for every goal scored by a player called Mario player LIKE 'Mario%'

    ```sql
    SELECT team1, team2, player
    FROM game JOIN goal
    ON (id=matchid)
    WHERE player LIKE 'Mario%'
    ```

5. Show player, teamid, coach, gtime for all goals scored in the first 10 minutes gtime<=10

    ```sql
    SELECT player, teamid, coach, gtime
    FROM goal join eteam
    ON teamid = id
    WHERE gtime<=10
    ```

6. List the dates of the matches and the name of the team in which 'Fernando Santos' was the team1 coach.

    ```sql
    SELECT mdate, teamname
    FROM game
    JOIN eteam
    ON (team1 = eteam.id)
    WHERE coach =  'Fernando Santos'
    ```

7. List the player for every goal scored in a game where the stadium was 'National Stadium, Warsaw'

    ```sql
    SELECT player
    From game
    Join goal
    ON (id=matchid)
    WHERE stadium =  'National Stadium, Warsaw'
    ```

8. Show the name of all players who scored a goal against Germany.

    ```sql
    SELECT DISTINCT player
    FROM game JOIN goal ON matchid = id and (team1 = 'GER' or team2 = 'GER')
        WHERE teamid != 'GER'

    or

    SELECT DISTINCT player
    FROM game JOIN goal ON matchid = id
        WHERE (team1= 'GER' OR team2='GER')
        AND teamid != 'GER'
    ```

9. Show teamname and the total number of goals scored.

    ```sql
    SELECT teamname, COUNT(*)as goals
    FROM eteam JOIN goal ON id=teamid
    GROUP BY teamname
    ```

10. Show the stadium and the number of goals scored in each stadium.

    ```sql
    SELECT stadium, COUNT(*) as goals
    FROM game
    JOIN goal
    ON id=matchid
    GROUP BY stadium
    ```

11. For every match involving 'POL', show the matchid, date and the number of goals scored.

    ```sql
    SELECT matchid,mdate,COUNT(*) as goals
    FROM game JOIN goal ON matchid = id
    WHERE (team1 = 'POL' OR team2 = 'POL')
    GROUP BY matchid, mdate
    ```

12. For every match where 'GER' scored, show matchid, match date and the number of goals scored by 'GER'

    ```sql
    SELECT matchid, mdate, COUNT(*) as goals
    FROM game JOIN goal
    ON id = matchid
    WHERE teamid = 'GER'
    GROUP BY matchid, mdate
    ```

13. List every match with the goals scored by each team as shown. This will use "CASE WHEN" which has not been explained in any previous exercises.

    |     mdate    | team1 | score1 | team2 | score2 |
    |:------------:|:-----:|:------:|:-----:|:------:|
    | 1 July 2012  | ESP   |      4 | ITA   |      0 |
    | 10 June 2012 | ESP   |      1 | ITA   |      1 |
    | 10 June 2012 | IRL   |      1 | CRO   |      3 |
    | ...          |       |        |       |        |
    | ...          |       |        |       |        |

    ```sql
    SELECT DISTINCT mdate,team1,
    SUM(CASE WHEN teamid=team1 THEN 1 ELSE 0 END) score1,
    team2,
    SUM(CASE WHEN teamid=team2 THEN 1 ELSE 0 END) score2
    FROM game
    JOIN goal ON game.id = goal.matchid
    GROUP BY id, mdate, team1, team2
    ORDER BY mdate, matchid, team1, team2
    ```

## Exercises 2

movie
| id | title | yr | director | budget | gross |
|----|-------|----|----------|--------|-------|

actor

| id | name |
|----|------|

casting
| movieid | actorid | ord |
|---------|---------|-----|

1. List the films where the yr is 1962 [Show id, title]

    ```sql
        SELECT id, title
        FROM movie
        WHERE yr=1962
    ```

2. Give year of 'Citizen Kane'.

    ```sql
        SELECT yr
        FROM movie
        WHERE title='Citizen Kane'
    ```

3. List all of the Star Trek movies, include the id, title and yr (all of these movies include the words Star Trek in the title). Order results by year.

    ```sql
        SELECT id, title,yr
        From movie
        WHERE title Like '%Star Trek%'
        ORDER BY yr
    ```

4. What id number does the actor 'Glenn Close' have?

    ```sql
        SELECT id
        FROM actor
        WHERE name =  'Glenn Close'
    ```

5. What is the id of the film 'Casablanca'

    ```sql
        SELECT id
        FROM movie
        WHERE title =  'Casablanca'
    ```

6. Obtain the cast list for 'Casablanca'.

    what is a cast list?
    The cast list is the names of the actors who were in the movie.
    Use movieid=11768, (or whatever value you got from the previous question)

    ```sql
        SELECT name
        FROM casting
        JOIN movie ON movieid = movie.id
        JOIN actor ON actorid = actor.id
        WHERE movieid = '11768'
    ```

7. Obtain the cast list for the film 'Alien'

    ```sql
        SELECT name
        FROM casting
        JOIN movie ON movieid = movie.id
        JOIN actor ON actorid = actor.id
        WHERE movie.title = 'Alien'
    ```

8. List the films in which 'Harrison Ford' has appeared

    ```sql
       SELECT movie.title
        FROM casting
        JOIN movie ON movieid = movie.id
        JOIN actor ON actorid = actor.id
        WHERE actor.name = 'Harrison Ford'
    ```

9. List the films where 'Harrison Ford' has appeared - but not in the starring role. [Note: the ord field of casting gives the position of the actor. If ord=1 then this actor is in the starring role]

    ```sql
        SELECT movie.title
        FROM casting
        JOIN movie ON movieid = movie.id
        JOIN actor ON actorid = actor.id
        WHERE actor.name = 'Harrison Ford' AND ord != 1
    ```

10. List the films together with the leading star for all 1962 films.

    ```sql
        SELECT movie.title, actor.name
        FROM casting
        JOIN movie ON movieid = movie.id
        JOIN actor ON actorid = actor.id
        WHERE movie.yr = 1962 AND ord = 1
    ```

11. Which were the busiest years for 'Rock Hudson', show the year and the number of movies he made each year for any year in which he made more than 2 movies.

    ```sql
        SELECT movie.yr, COUNT(title) as 'number of movies'
        FROM casting
        JOIN movie ON movieid = movie.id
        JOIN actor ON actorid = actor.id
        WHERE name = 'Rock Hudson'
        GROUP BY yr
        HAVING COUNT(title) > 2
    ```

12. List the film title and the leading actor for all of the films 'Julie Andrews' played in.

    ```sql
        SELECT title, name FROM casting
            JOIN movie ON movieid = movie.id
            JOIN actor ON actorid = actor.id
        WHERE movieid IN (
            SELECT movie.id FROM casting
            JOIN movie ON movieid = movie.id
            JOIN actor ON actorid = actor.id
            WHERE name='Julie Andrews')
        AND ord = 1
    ```

13. Obtain a list, in alphabetical order, of actors who've had at least 15 starring roles.

    ```sql
        SELECT DISTINCT actor.name FROM casting
            JOIN movie ON movieid = movie.id
            JOIN actor ON actorid = actor.id
        WHERE actorid IN (
            SELECT actorid FROM casting
            WHERE ord = 1
            GROUP BY actorid
            HAVING COUNT(actorid) >= 15)
        ORDER BY name
    ```

14. List the films released in the year 1978 ordered by the number of actors in the cast, then by title.

    ```sql
        SELECT title, COUNT(actorid) as actors FROM casting
            JOIN movie ON movieid = id
            WHERE yr = 1978
            GROUP BY movieid, title
            ORDER BY COUNT(actorid) DESC, title
    ```

15. List all the people who have worked with 'Art Garfunkel'.

    ```sql
        SELECT DISTINCT name FROM casting
            JOIN movie ON movieid = movie.id
            JOIN actor ON actorid = actor.id
        WHERE movieid IN(
            SELECT movieid FROM casting
            JOIN movie ON movie.id = movieid
            JOIN actor ON actorid = actor.id
            WHERE actor.name = 'Art Garfunkel'
            )
        AND actor.name != 'Art Garfunkel'
    ```
