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

![methods](https://github.com/yxj0312/docs/blob/master/images/sc_methods.JPG)

## Problems and solutions:

- To many assit method such like 'leave Team'

    1. Maybe create a service class instead
    2. Or create another controller and extract the assit methods to that controller, so here we can return to the seven restful actions(create/store/destory etc.):

        - Here, for example: create a TeamMembersController
        - Move 'storeMember', 'destoryMember' to this controller
        - Rename them to store and destroy.
        - 'inviteMember' also move to this controller

    ![methods_2](https://github.com/yxj0312/docs/blob/master/images/sc_methods_2.PNG)

- Ist 'findUserById' and 'findUserByEmail' above really necessary in TeamController?

    - Use Static method
        - We have a scopeOwnedBy Method:
        ```php
        public function ownedBy(Builder $query, $ownerId)
        {
            return $query->where('owner_id', $ownerId)
        }
        ```
        - Change it to a static method
        ```php
            public static function ownedBy($id)
            {
                return static::with('manager  ')->where('owner_id', $id)->first();
            }
        ```
        - Then we can use it like in getTeam()
        ```php
        protected function getTeam()
        {
            return Team::ownedBy(auth()->id());
        }
        ```
        - or in show() of TeamController

        ```php
        public function show(Request $request)
        {
            if (! $team = Team::ownedBy(auth()->id())) {
                return redirect()->route('create_team_path');
            }

            $data = [
                ....
            ]
        }
        ```

    - Or create a trait to do that

