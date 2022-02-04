# [Drop Down a Level](https://laracasts.com/series/ten-techniques-for-cleaner-code/episodes/5)

> Technique #5. Often, you'll find your controller conducting logic that might instead be better managed by the model. In this episode, we'll review a TeamMembersController that suffers from this very issue.

## Exmaple:

### store method from TeamMemebersController
```php
    public function store(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        try {
            $member = $this->invite($request->email);

            return $request->wantsJson() ? $memeber: $this->refresh('Invited!');
        } catch (Exception $E) {
            if ($request->wantsJson()) {
                return response()->json(['msg' => e->getMessage()], 406);
            }

            return $this->refresh($e->getMessage());
        }
    }
```

- I only need api call, don't need to do the checkout
    return $memeber;

```php
    public function store(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        try {
            return  $this->invite($request->email);
        } catch (Exception $E) {
            return response()->json(['msg' => e->getMessage()], 406);
        }
    }
```

- next level: How do we invite the user to the team?

```php
protected function invite($email)
{
    $member = User::whereEmail($email)->first();

    if(!$member) {
        $this->getTeam()->invite(trim($email));

        return response()->json([
            'email' => $email,
            'status' => 'Invited',
            'gravatarUrl' => '/image/default-squre-avatar.jpg'
        ]);
    }

    $this->getTeam()->add($member);

    return response()->json([
        'id' => $member->id,
        'email' => $email,
        'status' => 'Active',
        'gravatarUrl' => '/image/default-squre-avatar.jpg'
    ]);
}
```