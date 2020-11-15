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

2. Inner join: identical with join in MySQL, only give the result where thers are some matchers on both tables

3. Left/right join

```MySQL
SELECT *
FROM store
RIGHT JOIN address
ON store.address_id = address.address_id
```

    - left join and left outer join are the same thing
    - left side: store, right side: address
