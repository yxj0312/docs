# Foreign Key Constraints

> A constraint allows you to protect the integrity of your database tables. Imagine an order that is associated with a customer who no longer exists in your system. Luckily, we can guard ourselves against such orphans.

## Example
Two Tables
- Posts(id/title)
- Comments(id/body/post_id)

```sql
alert table comments
add foreign key (post_id) references posts(id) on delete cascade
```

Go sakila->store/film/inventory table