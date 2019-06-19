# [Sweat the Small Stuff](https://laracasts.com/series/ten-techniques-for-cleaner-code/episodes/3)

> Technique #3. Often, the little things that "don't make a difference" have a way of eventually defining the integrity of your entire codebase. So, yes, do sweat the small stuff (indentation, temporary variables, if statements, etc).

## Example
```php
class SupportController extends Controller
{
    public function store()
    {
        $this->validate(request(), [
            'name' => 'required',
            'email' => 'required|email',
            'question' => 'required',
            'verification' => 'required|in:5, five'
        ]);

        $email = 'support@laracast.com';

        $mailable = new \Laracast\Mail\SupportTicket(
            request()->input('email');
            request()->input('question');
        );

        Mail::to($email)->send($mailable);

        if (request()->wantsJson) {
            return [
                'status' => 'Success'
            ];
        } else {
            flash()->overlay(
                'Message Sent!',
                'We will get back to you as soon as possible.'
            );

            return redirect('/');
        }
    }
}

```

## Refactor
- Import everything
    ```php 
    use  \Laracast\Mail\SupportTicket;
    ```