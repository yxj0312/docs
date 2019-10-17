# Primary and Foreign Keys

> If a primary key is a unique identifier for a record within a table, then a foreign key is a reference to a primary key on a foreign table.

```sql
CREATE TABLE `actor` (
	`actor_id` SMALLINT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(45) NOT NULL,
	`last_name` VARCHAR(45) NOT NULL,
	`last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`actor_id`),
	INDEX `idx_actor_last_name` (`last_name`)
)
```
