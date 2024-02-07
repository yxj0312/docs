Certainly! Let's consider a common scenario in an online shop project: sending order confirmation emails asynchronously. We'll implement this using Symfony Messenger.

1. **Create a Message Class:**

   Create a message class for the order confirmation email, for example, `OrderConfirmationMessage.php`:

   ```php
   // src/Message/OrderConfirmationMessage.php

   namespace App\Message;

   class OrderConfirmationMessage
   {
       private $orderId;
       private $customerEmail;

       public function __construct(int $orderId, string $customerEmail)
       {
           $this->orderId = $orderId;
           $this->customerEmail = $customerEmail;
       }

       public function getOrderId(): int
       {
           return $this->orderId;
       }

       public function getCustomerEmail(): string
       {
           return $this->customerEmail;
       }
   }
   ```

2. **Create a Message Handler:**

   Create a handler class that will send the order confirmation email, for example, `OrderConfirmationHandler.php`:

   ```php
   // src/MessageHandler/OrderConfirmationHandler.php

   namespace App\MessageHandler;

   use App\Message\OrderConfirmationMessage;
   use Symfony\Component\Mailer\MailerInterface;
   use Symfony\Component\Mime\Email;

   class OrderConfirmationHandler
   {
       private $mailer;

       public function __construct(MailerInterface $mailer)
       {
           $this->mailer = $mailer;
       }

       public function __invoke(OrderConfirmationMessage $message)
       {
           $orderId = $message->getOrderId();
           $customerEmail = $message->getCustomerEmail();

           $email = (new Email())
               ->from('shop@example.com')
               ->to($customerEmail)
               ->subject('Order Confirmation - Order #' . $orderId)
               ->text('Thank you for your order. Your order is confirmed.');

           $this->mailer->send($email);
       }
   }
   ```

3. **Dispatch the Message:**

   When an order is placed, dispatch the order confirmation message:

   ```php
   // Somewhere in your code, e.g., after placing an order
   $orderId = 123; // Replace with the actual order ID
   $customerEmail = 'customer@example.com'; // Replace with the actual customer email

   $message = new \App\Message\OrderConfirmationMessage($orderId, $customerEmail);

   $bus = $this->container->get('messenger.default_bus');
   $bus->dispatch($message);
   ```

4. **Run the Worker:**

   Start the worker to process the order confirmation messages:

   ```
   php bin/console messenger:consume async
   ```

   This will ensure that the order confirmation emails are sent asynchronously, improving the responsiveness of your online shop.

Adjust the code according to your specific email sending needs, and make sure to configure your mailer settings in the Symfony configuration.


Certainly! Supervisor is a process control system for Unix-like operating systems that provides a convenient way to manage and control processes, ensuring they are always running. In the context of Symfony Messenger in an online shop, Supervisor can be used to manage the worker processes responsible for handling asynchronous tasks.

### Setting up Supervisor for Symfony Messenger:

1. **Install Supervisor:**

   Make sure Supervisor is installed on your server. You can typically install it using your system's package manager. For example, on Ubuntu:

   ```bash
   sudo apt-get install supervisor
   ```

2. **Create a Supervisor Configuration File:**

   Create a configuration file for Supervisor. Let's assume you have an online shop Symfony project with a Messenger worker. Create a file, e.g., `messenger_worker.conf`:

   ```conf
   [program:shop_messenger_worker]
   command=php /path/to/your/project/bin/console messenger:consume async
   autostart=true
   autorestart=true
   stderr_logfile=/var/log/shop_messenger_worker.err.log
   stdout_logfile=/var/log/shop_messenger_worker.out.log
   ```

   Adjust the `command` path to the location of your Symfony Messenger worker command.

3. **Configure Supervisor to Use the Configuration File:**

   Add the path to your Supervisor configuration file in the main Supervisor configuration file, often located at `/etc/supervisor/supervisord.conf`:

   ```conf
   [include]
   files = /path/to/your/project/messenger_worker.conf
   ```

   This ensures that Supervisor loads your Messenger worker configuration.

4. **Restart Supervisor:**

   Restart Supervisor to apply the changes:

   ```bash
   sudo service supervisor restart
   ```

### Real-World Online Shop Example:

Imagine you want to use Symfony Messenger to handle order confirmation emails asynchronously in your online shop. You have a `OrderConfirmationHandler` service that processes `OrderConfirmationMessage` messages.

```yaml
# config/packages/messenger.yaml

framework:
    messenger:
        transports:
            async: '%env(MESSENGER_TRANSPORT_DSN)%'
        routing:
            'App\Message\OrderConfirmationMessage': async
```

Now, you can dispatch messages in your application when an order is placed. Supervisor ensures that the Messenger worker is always running and processes these messages in the background, sending order confirmation emails asynchronously.

This setup enhances the responsiveness of your online shop by offloading time-consuming tasks, such as sending emails, to background workers managed by Supervisor.
