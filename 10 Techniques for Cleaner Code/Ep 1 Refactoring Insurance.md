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

## Let's us create a test:

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