In Symfony, one common way to implement notifications, such as popups for actions like saving or updating, is to use Symfony's Flash Messages in combination with JavaScript to display them on the frontend. Here's a step-by-step guide on how to achieve this:

1. **Backend (Symfony)**:

   In your controller action where the action (e.g., saving or updating) takes place, you can set flash messages using Symfony's session service. Flash messages are messages that are stored in the session and only displayed once. Symfony provides a convenient way to set and retrieve flash messages.

   ```php
   // ExampleController.php
   
   use Symfony\Component\HttpFoundation\Response;
   use Symfony\Component\HttpFoundation\Request;
   use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
   
   class ExampleController extends AbstractController
   {
       public function saveAction(Request $request): Response
       {
           // Your saving logic here
           
           // Set flash message
           $this->addFlash('success', 'Item saved successfully!');
   
           // Redirect to another page or return a response
           return $this->redirectToRoute('some_route');
       }
   }
   ```

2. **Frontend (JavaScript)**:

   You can use JavaScript to display these flash messages as popups or notifications on the frontend. You might choose to use a JavaScript library like jQuery or a modern framework like Vue.js or React.js to handle this part. Here's a basic example using jQuery:

   ```javascript
   // Include jQuery in your HTML if not already included
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

   // Custom JavaScript to display flash messages
   $(document).ready(function() {
       // Check if there are flash messages
       var flashMessages = $('.flash-messages').data('messages');
       if (flashMessages) {
           // Loop through each flash message and display as a popup
           flashMessages.forEach(function(message) {
               alert(message);
           });
       }
   });
   ```

3. **Twig Template**:

   In your Twig templates, you can render flash messages using a loop. Here's an example Twig template:

   ```twig
   {# base.html.twig #}

   <!DOCTYPE html>
   <html>
   <head>
       <title>Online Shop</title>
   </head>
   <body>
       <div class="flash-messages" data-messages="{{ app.session.flashBag.all()['success'] }}"></div>
       {% block content %}{% endblock %}
       <script src="{{ asset('js/notification.js') }}"></script>
   </body>
   </html>
   ```

   Ensure that you're rendering your flash messages in your base template so they can be displayed across your application.

4. **Styling**:

   You may want to style your notifications or popups to match the design of your online shop. This can be achieved with CSS to control the appearance of the messages.

By following this approach, you can easily implement notification messages in your Symfony project and display them as popups or notifications on the frontend after actions like saving or updating. This approach is commonly used, performs well, and follows best practices in Symfony development.

I apologize for the confusion. `addFlash()` is actually a method provided by Symfony's `ControllerTrait`, which is included in `Symfony\Bundle\FrameworkBundle\Controller\AbstractController`. So you're correct, `addFlash()` is indeed available in controllers that extend `AbstractController`. Thank you for catching that mistake. Here's the corrected portion:

```php
// ExampleController.php
   
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ExampleController extends AbstractController
{
    public function saveAction(Request $request): Response
    {
        // Your saving logic here
        
        // Set flash message
        $this->addFlash('success', 'Item saved successfully!');

        // Redirect to another page or return a response
        return $this->redirectToRoute('some_route');
    }
}
```

Thank you for your patience. Let me know if you have any further questions or concerns!
