# Use Unions to Run Queries Independently

> Let's now review how we can achieve the same benefits of running multiple queries, but within a single database query.

```SQL
select *
from users
where first_name like 'bill%' or last_name like 'bill%'

union

select users.*
from users
inner join companies on companies.id = users.company_id
where companies.name like 'bill%'

```

Using explain on it, it uses all of our indexes. But how exactly do we bring this to user query in our app?

```SQL
select *
from users
where id in (
    select id
    from users
    where first_name like 'bill%' or last_name like 'bill%'

    union

    select users.id
    from users
    inner join companies on companies.id = users.company_id
    where companies.name like 'bill%'
)
```

our run time back to long, because we have a dependent sub query and two dependent unions. That means our new union query is not running ini isolation, rather, it's being considered a dependency of the parent query and that's throwing everything off.

A derived table

A derived table can break the dependency between the inner and outer queries. It is simply a "from statement" that has a subquery within it.

```SQL
select *
from users
where id in (
    select id from (
        select id
        from users
        where first_name like 'bill%' or last_name like 'bill%'

        union

        select users.id
        from users
        inner join companies on companies.id = users.company_id
        where companies.name like 'bill%'
    ) as matches
)
```

Okay, let' rerun the explain: If we look at the "select_type" column, we can  see that we no longer have any dependencies. If we look at our indexes column, we can see that we're now using our first, last and company name indexes. and our run time back down to 1ms.
