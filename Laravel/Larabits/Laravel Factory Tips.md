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
        'experience' => $this->faker->randomNumber(),
        'password' => 'password',
        'remember_token' => Str::random(10),
    ];
}
```

- We could use optional and weight to make a null input
