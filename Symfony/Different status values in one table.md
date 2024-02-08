If you want to reuse the same status table for different processes and assign different meanings to the status values based on the process, you can introduce a `process_type` column in your status table. Let's consider a real-world example of an online shop with different processes, such as order processing and product review handling.

### Database Schema:

1. **Status Table:**

   ```sql
   CREATE TABLE statuses (
       id SERIAL PRIMARY KEY,
       process_type VARCHAR(50) NOT NULL,
       value INT NOT NULL,
       meaning VARCHAR(255) NOT NULL
   );
   ```

### Symfony Entity Class:

1. **Status Entity:**

   ```php
   // src/Entity/Status.php

   namespace App\Entity;

   use Doctrine\ORM\Mapping as ORM;

   /**
    * @ORM\Entity
    * @ORM\Table(name="statuses")
    */
   class Status
   {
       /**
        * @ORM\Id
        * @ORM\GeneratedValue(strategy="AUTO")
        * @ORM\Column(type="integer")
        */
       private $id;

       /**
        * @ORM\Column(type="string", length=50)
        */
       private $processType;

       /**
        * @ORM\Column(type="integer")
        */
       private $value;

       /**
        * @ORM\Column(type="string", length=255)
        */
       private $meaning;

       // getters and setters
   }
   ```

### Usage Example:

```php
// In your controller or service
$statusOrderProcessing = new Status();
$statusOrderProcessing->setProcessType('order_processing');
$statusOrderProcessing->setValue(1);
$statusOrderProcessing->setMeaning('Order Processing');

$statusProductReview = new Status();
$statusProductReview->setProcessType('product_review');
$statusProductReview->setValue(1);
$statusProductReview->setMeaning('Product Review Pending');

// Persist the status entities

$entityManager->persist($statusOrderProcessing);
$entityManager->persist($statusProductReview);
$entityManager->flush();
```

In this example, the `process_type` column distinguishes between different processes using the same status table. The `value` column maintains the actual status value (e.g., 1 to 10), and the `meaning` column provides a description for the status.

You can then associate these status entities with your other entities, such as orders or product reviews, and leverage the `process_type` and `value` columns to determine the context and meaning of the status for each process.
