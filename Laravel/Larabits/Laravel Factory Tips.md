# Laravel Factory Tips

We have a UserFactory for Test

```php

protected $model = User::class;

public function definition()
{
    return [
        'name' => $this->faker->name(),
        'email' => $this->faker->unique()->safEmail(),
        'email_verified_at' => now(),
        'bio' => $this->faker->optional($weight = 0.5)->sentence(12),
        'experience' => $this->faker->valid(fn ($exp) => $exp < 100)->randomNumber(),
        'password' => 'password',
        'remember_token' => Str::random(10),
    ];
}
```

- We could use optional and weight to make a null input
- Use valid(), and callback function to limit the number
- Set some state function in the Factory,and use it in test mockup <https://laravel.com/docs/9.x/database-testing#factory-states>

```php
public function pinned()
{
    return $this->state(function(array $attributes){
        return [
            'pinned' => true,
        ]
    })
}
```

- Sequences <https://laravel.com/docs/9.x/database-testing#sequences>

```php
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
 
$users = User::factory()
                ->count(10)
                ->state(new Sequence(
                    ['admin' => 'Y'],
                    ['admin' => 'N'],
                ))
                ->create();
```

- Relationships <https://laravel.com/docs/9.x/database-testing#factory-relationships>

1. belongs to

<https://laravel.com/docs/9.x/database-testing#belongs-to-relationships>

```php
use App\Models\Post;
use App\Models\User;
 
$posts = Post::factory()
            ->count(3)
            ->for(User::factory()->state([
                'name' => 'Jessica Archer',
            ]))
            ->create();

```

2. Manytomany

   <https://laravel.com/docs/9.x/database-testing#many-to-many-relationships>

```php
use App\Models\Role;
use App\Models\User;
 
$user = User::factory()
            ->has(Role::factory()->count(3))
            ->create();

```
