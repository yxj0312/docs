# [Be Strict With Your Controllers](https://laracasts.com/series/ten-techniques-for-cleaner-code/episodes/4)

> Technique #4. If you're not careful, it's easy for a controller to quickly get out of hand. All of the sudden, you have countless endpoints and actions - each with its own set of private helper methods. An alternative approach is to strictly adhere to the seven restful actions. If you find yourself reaching for a different name, ask yourself if you can instead create a brand new controller.

## Example
```php
class TeamsController extends Controller {
    public function show(Request $request)
    {
        if (! $stream = $this->getTeam()) {
            return redirect()->route('create_team_path');
        }
    }

    $data = [
        'team' => $team,
        'members' => $team->getAllMembersAndInvitations()->makeVisible('email'),
        'teamId' => $team->id,
        'name' => $team->name,
    ]
    ....
}
```

[methods](https://github.com/yxj0312/docs/blob/master/images/sc_methods.JPG)