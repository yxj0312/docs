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
