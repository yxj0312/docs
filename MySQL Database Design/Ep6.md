# SQL ZOO Example

## Using Null

teacher

| id  | dept | name       | phone | mobile         |
|-----|------|------------|-------|----------------|
| 101 | 1    | Shrivell   | 2753  | 07986 555 1234 |
| 102 | 1    | Throd      | 2754  | 07122 555 1920 |
| 103 | 1    | Splint     | 2293  |                |
| 104 |      | Spiregrain | 3287  |                |
| 105 | 2    | Cutflower  | 3212  | 07996 555 6574 |
| 106 |      | Deadyawn   | 3345  |                |
| ... |      |            |       |                |

dept

| d   | name        |
|-----|-------------|
| 1   | Computing   |
| 2   | Design      |
| 3   | Engineering |
| ... |             |

### Teachers and Departments
The school includes many departments. Most teachers work exclusively for a single department. Some teachers have no department.

Selecting NULL values.

Summary

1. List the teachers who have NULL for their department.

```sql
SELECT name FROM teacher
WHERE dept IS NULL
```

2. Note the INNER JOIN misses the teachers with no department and the departments with no teacher.

```sql
SELECT teacher.name, dept.name
 FROM teacher INNER JOIN dept
           ON (teacher.dept=dept.id)
```

3. Use a different JOIN so that all teachers are listed.

```sql
SELECT teacher.name, dept.name
 FROM teacher LEFT JOIN dept
           ON (teacher.dept=dept.id)
```
4. Use a different JOIN so that all departments are listed.

```sql
SELECT teacher.name, dept.name
 FROM teacher RIGHT JOIN dept
           ON (teacher.dept=dept.id)
```

5. Use COALESCE to print the mobile number. Use the number '07986 444 2266' if there is no number given. Show teacher name and mobile number or '07986 444 2266'

COALESCE takes any number of arguments and returns the first value that is not null.
```
  COALESCE(x,y,z) = x if x is not NULL
  COALESCE(x,y,z) = y if x is NULL and y is not NULL
  COALESCE(x,y,z) = z if x and y are NULL but z is not NULL
  COALESCE(x,y,z) = NULL if x and y and z are all NULL
```

COALESCE can be useful when you want to replace a NULL value with some other value. In this example you show the name of the party for each MSP that has a party. For the MSP with no party (such as Canavan, Dennis) you show the string None.

```sql
SELECT name, party
      ,COALESCE(party,'None') AS aff
  FROM msp WHERE name LIKE 'C%'
```

|           name           | party |  aff |
|:------------------------:|:-----:|:----:|
| Campbell MSP, Colin      | SNP   | SNP  |
| Canavan MSP, Dennis      | null  | None |
| Chisholm MSP, Malcolm    | Lab   | Lab  |
| Craigie MSP, Cathie      | Lab   | Lab  |
| Crawford JP MSP, Bruce   | SNP   | SNP  |
| Cunningham MSP, Roseanna | SNP   | SNP  |
| Curran MSP, Ms Margaret  | Lab   | Lab  |

```sql
SELECT teacher.name, COALESCE(teacher.mobile,'07986 444 2266') as mobile
FROM teacher
```

6. Use the COALESCE function and a LEFT JOIN to print the teacher name and department name. Use the string 'None' where there is no department.
```sql
SELECT teacher.name, COALESCE(dept.name, 'None')
FROM teacher LEFT JOIN dept ON teacher.dept = dept.id
```

7. Use COUNT to show the number of teachers and the number of mobile phones.

```sql
SELECT COUNT(teacher.name) as teacher, COUNT(teacher.mobile) as mobile
FROM teacher
```

8. Use COUNT and GROUP BY dept.name to show each department and the number of staff. Use a RIGHT JOIN to ensure that the Engineering department is listed.
```sql
SELECT dept.name, COUNT(teacher.name)
FROM teacher RIGHT JOIN dept ON (teacher.dept = dept.id) GROUP BY dept.name 
```

9. Use CASE to show the name of each teacher followed by 'Sci' if the teacher is in dept 1 or 2 and 'Art' otherwise.

CASE allows you to return different values under different conditions.

If none of the conditions match (and there is not ELSE) then NULL is returned.

```
CASE WHEN condition1 THEN value1 
       WHEN condition2 THEN value2  
       ELSE def_value 
END 
```
```sql
SELECT name, population
      ,CASE WHEN population<1000000 
            THEN 'small'
            WHEN population<10000000 
            THEN 'medium'
            ELSE 'large'
       END
  FROM world
```
|         name        | population | CASE WHEN pop.. |
|:-------------------:|:----------:|:---------------:|
| Afghanistan         |   32225560 | large           |
| Albania             |    2845955 | medium          |
| Algeria             |   43000000 | large           |
| Andorra             |      77543 | small           |
| Angola              |   31127674 | large           |
| Antigua and Barbuda |      96453 | small           |
| Argentina           |   44938712 | large           |
| Armenia             |    2957500 | medium          |

```sql
SELECT teacher.name
,CASE WHEN teacher.dept = 1
      THEN 'Sci'
      WHEN teacher.dept = 2
      THEN 'Sci'
      ELSE 'Art'
  END
FROM teacher
```

10. Use CASE to show the name of each teacher followed by 'Sci' if the teacher is in dept 1 or 2, show 'Art' if the teacher's dept is 3 and 'None' otherwise.
```sql
SELECT teacher.name
,CASE WHEN teacher.dept = 1
      THEN 'Sci'
      WHEN teacher.dept = 2
      THEN 'Sci'
      WHEN teacher.dept = 3
      THEN 'Art'
      ELSE 'None'
  END
FROM teacher
```
