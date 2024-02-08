To model a process with different statuses in a Symfony project, you can design your database using tables for entities involved in the process and a status table to keep track of the different statuses. Let's consider an example of an order processing system in an online shop.

### Database Schema:

1. **Order Table:**

   ```sql
   CREATE TABLE orders (
       id SERIAL PRIMARY KEY,
       customer_id INT,
       total_amount DECIMAL(10, 2),
       status_id INT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (customer_id) REFERENCES customers(id),
       FOREIGN KEY (status_id) REFERENCES order_statuses(id)
   );
   ```

2. **Order Status Table:**

   ```sql
   CREATE TABLE order_statuses (
       id SERIAL PRIMARY KEY,
       name VARCHAR(50) UNIQUE NOT NULL
   );
   ```

3. **Customer Table:**

   ```sql
   CREATE TABLE customers (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(255) NOT NULL
   );
   ```

### Symfony Entity Classes:

1. **Order Entity:**

   ```php
   // src/Entity/Order.php

   namespace App\Entity;

   use Doctrine\ORM\Mapping as ORM;

   /**
    * @ORM\Entity
    * @ORM\Table(name="orders")
    */
   class Order
   {
       // properties and annotations

       /**
        * @ORM\ManyToOne(targetEntity="Customer")
        * @ORM\JoinColumn(name="customer_id", referencedColumnName="id", nullable=false)
        */
       private $customer;

       /**
        * @ORM\ManyToOne(targetEntity="OrderStatus")
        * @ORM\JoinColumn(name="status_id", referencedColumnName="id", nullable=false)
        */
       private $status;

       // getters and setters
   }
   ```

2. **OrderStatus Entity:**

   ```php
   // src/Entity/OrderStatus.php

   namespace App\Entity;

   use Doctrine\ORM\Mapping as ORM;

   /**
    * @ORM\Entity
    * @ORM\Table(name="order_statuses")
    */
   class OrderStatus
   {
       // properties and annotations

       /**
        * @ORM\Column(type="string", length=50, unique=true, nullable=false)
        */
       private $name;

       // getters and setters
   }
   ```

3. **Customer Entity:**

   ```php
   // src/Entity/Customer.php

   namespace App\Entity;

   use Doctrine\ORM\Mapping as ORM;

   /**
    * @ORM\Entity
    * @ORM\Table(name="customers")
    */
   class Customer
   {
       // properties and annotations

       // getters and setters
   }
   ```

### Usage Example:

```php
// In your controller or service
$customer = new Customer();
// set customer properties

$order = new Order();
$order->setCustomer($customer);
$order->setStatus($entityManager->getReference(OrderStatus::class, $statusId)); // Assuming $statusId is the desired status ID
// set other order properties

$entityManager->persist($customer);
$entityManager->persist($order);
$entityManager->flush();
```

This example demonstrates a simple order processing system with different statuses. You can extend this schema based on your specific requirements and add more entities and relationships as needed. The use of Doctrine ORM in Symfony simplifies database interactions and enhances code maintainability.
