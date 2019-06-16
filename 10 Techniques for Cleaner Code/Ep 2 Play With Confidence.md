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
- Change foreach to collection each
- Remove $users
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

- Extract method makeCoupon()
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
- Add a trait for scope to $user model

```php
    trait Subscribable
    {
        public function scopeOnPlan($query. $plan)
        {
            $query->where('stripe_plan', $plan);
        }

        public function scopeSubscribedOn($query, $date =  null)
        {
            // Default: of last week
            $date = $date ?? today()->subweek();
             
            $query->where('created_at', $date);
        }
    }
```

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
            ->onPlan('monthly-15') 
            ->subscribedOn(today()->subMonths(3))
            // You can get rid of this get(), because there is a each method on the query build.
            // ->get()
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
            'code' => hash('md5', $user->id . '-' . time()),
            'percentage_discount' => 10,
            'description' => 'Upgrade to yearly',
            'duration' => 'once'
        ], $gateway);
    }

}
```

- Refactor code generation without including user id or time
```php

protected function makeCoupon($gateway)
{
    return  Coupon::generate([
        'code' => str_random(25),
        'percentage_discount' => 10,
        'description' => 'Upgrade to yearly',
        'duration' => 'once'
    ], $gateway);
}
```

- In the command construct, we resolve our gateway
```php
class SendUpgradeCouponToNewMonthlySubscribers extends Command
{
    protected $signature = 'laracasts:send-upgrade-coupon-to-new-monthly-subscribers';

    protected $description = 'Send a coupon to monthly subscribers to upgrade.';

    protected $gateway;

    public function __construct(Gateway $gateway)
    {
        $this->gateway = $gateway;

        parent::__construct();
    }

    /**
     * Excute the console command
    */
    public function handle()
    {
        User::active()
            ->onPlan('monthly-15') 
            ->subscribedOn(today()->subMonths(3))
            ->each(function ($user) {
                Mail::to($user)->send(
                    new UpgradeToYearly($user, $this->makeCoupon())
                );

                $this->info("Send email to {$user->email}");
            });

        $this->info('Done'); 
    }

    protected function makeCoupon()
    {
        return  Coupon::generate([
            'code' => str_random(25),
            'percentage_discount' => 10,
            'description' => 'Upgrade to yearly',
            'duration' => 'once'
        ], $this->gateway);
    }

}
```

- Or another approach
```php
class SendUpgradeCouponToNewMonthlySubscribers extends Command
{
    protected $signature = 'laracasts:send-upgrade-coupon-to-new-monthly-subscribers';

    protected $description = 'Send a coupon to monthly subscribers to upgrade.';

    /**
     * Excute the console command
    */
    public function handle()
    {
        User::active()
            ->onPlan('monthly-15') 
            ->subscribedOn(today()->subMonths(3))
            ->each(function ($user) {
                Mail::to($user)->send(
                    new UpgradeToYearly($user, $this->makeCoupon())
                );

                $this->info("Send email to {$user->email}");
            });

        $this->info('Done'); 
    }

    protected function makeCoupon()
    {
        return  Coupon::generate([
            'code' => str_random(25),
            'percentage_discount' => 10,
            'description' => 'Upgrade to yearly',
            'duration' => 'once'
            // Resolve() === app(): grap this thing out of the service container
        ], resolve(Gateway::class));
    }
}
```
- Expose that a user can be emailed

```php
    trait Subscribable
    {
        public function scopeOnPlan($query, $plan)
        {
            $query->where('stripe_plan', $plan);
        }

        public function scopeSubscribedOn($query, $date =  null)
        {
            // Default: of last week
            $date = $date ?? today()->subweek();
             
            $query->where('created_at', $date);
        }

        // Call while sending through the user
        public function email($callback)
        {
            return Mail::to($this)->send($callback($this));
        }
    }
```

```php
class SendUpgradeCouponToNewMonthlySubscribers extends Command
{
    protected $signature = 'laracasts:send-upgrade-coupon-to-new-monthly-subscribers';

    protected $description = 'Send a coupon to monthly subscribers to upgrade.';

    /**
     * Excute the console command
    */
    public function handle()
    {
        User::active()
            ->onPlan('monthly-15') 
            ->subscribedOn(today()->subMonths(3))
            ->get()
            ->each
            ->email(function ($user) {
                $this->info("Send email to {$user->email}");

                return new UpgradeToYearly($user, $this->makeCoupon());
            });

        $this->info('Done'); 
    }

    protected function makeCoupon()
    {
        return  Coupon::generate([
            'code' => str_random(25),
            'percentage_discount' => 10,
            'description' => 'Upgrade to yearly',
            'duration' => 'once'
            // Resolve() === app(): grap this thing out of the service container
        ], resolve(Gateway::class));
    }
}
```

- Pluck email instead of info('Done')

```php
class SendUpgradeCouponToNewMonthlySubscribers extends Command
{
    protected $signature = 'laracasts:send-upgrade-coupon-to-new-monthly-subscribers';

    protected $description = 'Send a coupon to monthly subscribers to upgrade.';

    /**
     * Excute the console command
    */
    public function handle()
    {
        $emails = User::active()
            ->onPlan('monthly-15') 
            ->subscribedOn(today()->subMonths(3))
            ->get()
            ->each
            ->email(function ($user) {
                return new UpgradeToYearly($user, $this->makeCoupon());
            })
            ->pluck('email');

        $this->info(
            "Finished. Sent upgrade coupons to " .
            $emails->implode(', ')
        ); 
    }

    protected function makeCoupon()
    {
        return  Coupon::generate([
            'code' => str_random(25),
            'percentage_discount' => 10,
            'description' => 'Upgrade to yearly',
            'duration' => 'once'
            // Resolve() === app(): grap this thing out of the service container
        ], resolve(Gateway::class));
    }
}
```