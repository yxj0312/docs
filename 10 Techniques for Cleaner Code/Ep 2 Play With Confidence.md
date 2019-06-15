# [Play With Confidence](https://laracasts.com/series/ten-techniques-for-cleaner-code/episodes/2)

> Technique #2. Now that we've learned to back up our code with a series of tests, we can move on to the second technique. Clean code isn't a straight line. Often, you'll follow a variety of roundabouts, tunnels, and even u-turns to get there. The secret is to play with confidence. Make a small tweak, run the tests, and then decide: "Is this better than before?"

## Problem 3: We don't have test coverage for 
```php
$coupon = Coupon::generate([
    'code' => hash('md5', $user->id . '_' . time()),
    'percentage_discount' => 10,
    'description' => 'Upgrade to yearly',
    'duration' => 'once'
], $gateway);
```

## Solution: write the test
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

            $gateway->shouldHaveReceived()->createCoupon(\Mockery::on(function ($coupon) {
                return $coupon->percentage_discount === 10;
            }))->once();

            // Then, they should receive an email
            Mail::assertSent(UpgradeToYearly::class, 1);
        }

    }
```

### Refactor 
- change foreach to collection each
- remove $users
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
        User::active()
            ->where('stripe_plan', 'monthly-15')
            ->whereDay('created_at', today()->subMonths(3))
            ->get()
            ->each(function ($user) use ($gateway){
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
            });

        $this->info('Done'); 
    }

}
```

- extract method makeCoupon()
- Add info after sending email
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
        User::active()
            ->where('stripe_plan', 'monthly-15')
            ->whereDay('created_at', today()->subMonths(3))
            ->get()
            ->each(function ($user) use ($gateway){
                Mail::to($user)->send(
                    // a mailable class
                    new UpgradeToYearly($user, $this->makeCoupon($user, $gateway))
                );

                $this->info("Send email to {$user->email}");
            });

        $this->info('Done'); 
    }

    protected function makeCoupon($user, $gateway)
    {
        return  Coupon::generate([
            'code' => hash('md5', $user->id . '_' . time()),
            'percentage_discount' => 10,
            'description' => 'Upgrade to yearly',
            'duration' => 'once'
        ], $gateway);
    }

}
```

