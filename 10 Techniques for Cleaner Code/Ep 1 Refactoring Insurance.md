# [Refactoring Insurance](https://laracasts.com/series/ten-techniques-for-cleaner-code/episodes/1)

> Technique #1. You can't improve your code if you're terrified to change it. That's where tests come into play. Think of them as refactoring insurance. Go ahead, make as many tweaks as you need to. Each step of the way, your tests will let you know if you've made a mistake.

## Example

```php
class SendUpgradeCouponToNewMonthlySubscribers extends Command
{
    protected $signature = 'laracasts:send-upgrade-coupon-to-new-monthly-subscribers';

    protected $description = 'Send a coupon to monthly subscribers to upgrade.';

    /**
     * Excute the console command
    */
    public function handle(Gateway $gateway)
    {
        $users = User::active()
                ->where('stripe_plan', 'monthly-15')
                ->whereDay('created_at', today()->subMonths(3))
                ->get();

        foreach ($users as $user) {
            $coupon = Coupon::generate([
                'code' => hash('md5', $user->id . '_' . time()),
                'percentage_discount' => 10,
                'description' => 'Upgrade to yearly',
                'duration' => 'once'
            ], $gateway);

            $this->info('Sending email to ' . $user->email);

            Mail::to($user)->send(
                // a mailable class
                new UpgradeToYearly($user, $coupon)
            );
        }

        $this->info('Done'); 
    }

}
```

## Let's create a test:

```php
    class SendUpgradeCouponToNewMonthlySubscribersTest extends TestCase
    {
        use DatabaseTransactions;

        /** @test */
        function it_sends_an_upgrade_coupon_to_new_monthly_subscribers()
        {
            Mail::fake();

            // Given we have a user who signed up 3 months ago
            $user = factory(User::class)->create(['created_at' => today()->subMonths(3)]);

            // When I run this artisan command
            $this->artisan('laracasts:send-upgrade-coupon-to-new-monthly-subscribers');

            // We should generate a coupon

            // Then, they should receive an email
            Mail::assertSent(UpgradeToYearly::class);
        }

    }
```

### Problem 1: test takes too lang

Reason: in iteration it calls stripe api.

### Solution: Mock a gateway class

```php
    class SendUpgradeCouponToNewMonthlySubscribersTest extends TestCase
    {
        use DatabaseTransactions;

        /** @test */
        function it_sends_an_upgrade_coupon_to_new_monthly_subscribers()
        {
            Mail::fake();

            // Given we have a user who signed up 3 months ago
            $user = factory(User::class)->create(['created_at' => today()->subMonths(3)]);

            // Tell laravel, if you ever need resolve gateway out the service container, I don't wanna you instantiate the gateway class directly, instead, i wanna send through the mockery spy. 
            $gateway = \Mockery::spy(Gateway::class);

            $this->swap(Gateway::class, $gateway);

            // When I run this artisan command
            $this->artisan('laracasts:send-upgrade-coupon-to-new-monthly-subscribers');

            // We should generate a coupon
            // $gateway->createCoupon() will be called in the original iteration.
            $gateway->shouldHaveReceived()->createCoupon(\Mockery::any());

            // Then, they should receive an email
            Mail::assertSent(UpgradeToYearly::class, 1);
        }

    }
```

#### Benefits of mockery:

If in the original codes, we don't generate the coupon and ```$coupon = new Coupon()``` instead, the test will be failed: We excpeted to call the ```createCoupon()``` one time, but it didn't do it at all.

- We have asserted that this command has been sent.
- We have also locked any unnecessary api calls, which improve the speed of the test.

#### Be very Careful:
More you use mocks, you get little more capping there. Because now in order to test the class, I have to call ```createCoupon()``` method, but whatif I want to create coupon in different way. Even I was doing it correctly, this test will still failed.


### Problem 2: we have an issue. If we have two users (only one user meets the condition), we still call the ```createCoupon()``` two times.

```php
    class SendUpgradeCouponToNewMonthlySubscribersTest extends TestCase
    {
        use DatabaseTransactions;

        /** @test */
        function it_sends_an_upgrade_coupon_to_new_monthly_subscribers()
        {
            Mail::fake();

            // This person should receive an upgrade coupon.
            factory(User::class)->create(['created_at' => today()->subMonths(3)]);

            // These folks should not
            factory(User::class)->create(['created_at' => today()->subMonths()]);
            factory(User::class)->create(['created_at' => today()->subMonths(3), 'stripe_plan' => 'yearly']);

            $gateway = \Mockery::spy(Gateway::class);

            $this->swap(Gateway::class, $gateway);

            $this->artisan('laracasts:send-upgrade-coupon-to-new-monthly-subscribers');

            $gateway->shouldHaveReceived()->createCoupon(\Mockery::any());

            // Then, they should receive an email
            Mail::assertSent(UpgradeToYearly::class, 1);
        }

    }
```

Reason: 

```php
$users = User::active()
        ->where('stripe_plan', 'monthly-15')
        // Should be whereDate, not whereDay
        ->whereDate('created_at', today()->subMonths(3))
        ->get();
```