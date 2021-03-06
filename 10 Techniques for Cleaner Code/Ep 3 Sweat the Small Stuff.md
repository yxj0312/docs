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
            request()->input('email'),
            request()->input('question')
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
Test:
```php 
/** @test */
function it_sends_a_support_email()
{
    Mail::fake();

    $this->post('/contact', $fields = $this->validFields());

    Mail::assertQueued(SupportTicket::class. function($mail) use ($filed){
        return $mail->sender == $fields['email'];
    })
}
```


## Refactor
- Import everything
    ```php 
    use  \Laracast\Mail\SupportTicket;
    ```

- Call validate method directly
    ```php 
        request()->validate([
            'name' => 'required',
            'email' => 'required|email',
            'question' => 'required',
            'verification' => 'required|in:5, five'
        ]);
    ```

- Inline instead of creating variable for only one time used email
    ```php 
        Mail::to('support@laracast.com')->send($mailable);
    ```
- Change hard coding of email address with a configuration file
    ```php 
        Mail::to(config('laracasts.supportEmail'))->send($mailable);
    ```
- Instead of request()->input, using:
    ```php 
        $mailable = new SupportTicket(request('email'),request('question'));
    ```
- $mailable can be inline
    ```php 
        Mail::to(config('laracasts.supportEmail'))->send(
            new SupportTicket(request('email'),request('question')
        );
    ```
- Change send to queue
    ```php 
        Mail::to(config('laracasts.supportEmail'))->queue(
            new SupportTicket(request('email'),request('question')
        );
    ```
- Refactor if-else
    - ```return ['status' => 'Success'];``` could be in one line.
    - if-else is good for readability. but in this case, we already have a return before else.
    -  there's home() helper function.
    ```php 
        if (request()->wantsJson) {
            return ['status' => 'Success'];
        }

        flash()->overlay(
            'Message Sent!',
            'We will get back to you as soon as possible.'
        );

        return home();    
    ```
- Add doc block for comment
    ```php 
        /**
         * Submit a new support request.
         *
         * @return array|\RedirectResponse 
         */  
    ```
- Validate attributes(optional)
    ```php 
        $attributes = request()->validate([
            'name' => 'required',
            'email' => 'required|email',
            'question' => 'required',
            'verification' => 'required|in:5, five'
        ]);

        Mail::to(config('laracasts.supportEmail'))->queue(
            new SupportTicket($attributes['email'], $attributes['question']
        );
    ```