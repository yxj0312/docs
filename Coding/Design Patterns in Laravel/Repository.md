# Repository pattern

In simple words, the Repository pattern in a laravel application is a bond between models and controllers. In this process, the model should not be responsible for connecting with or retrieving data from the database. Therefore, to keep our code clean and safe, it is necessary to use the repository. It reduces the duplication and errors of our code.

Let’s think of an example, we have a customer table in our database, where we can add, store, edit and delete customer data. We also have a Customer model. The idea is, we’re going to create an interface and define some methods. Like this-

TestInterface.php:

```php
<?php
//(Here the App\Repositories is the folder name)
namespace App\Repositories;

interface TestInterface
{
   public function all();

   public function get($id);

   public function store(array $data);

   public function update($id, array $data); 

   public function delete($id);
}
?>
```

For this tutorial, our interface name is TestInterface and we have five methods called all(), get(), store(), update() and delete(). Now our interface is created, we need to create a repository. In the repository, we’re going to call these methods from the interface and implement them. Let’s create a repository-

TestRepositoryOne.php

```php

<?php
//(Here the App\Repositories is the folder name)
namespace App\Repositories;
use App\Models\Customer;

class TestRepositoryOne implemets TestInterface
{
 //To view all the data
 public function all()
 {
  return Customer::get();
 }
 //Get an individual record
 public function get($id)
 {
  return Customer::find($id);
 }
 //Store the data
 public function store(array $data)
 {
  return Customer::create($data);
 }
 //Update the data
 public function update($id, array $data)
 {
  return Customer::find($id)->update($data);
 }
 //Delete the data
 public function delete($id)
 {
  return Customer::destroy($id);
 }
}
?>

```

Here our repository name is TestRepositoryOne which implements the TestInterface. Now, all those methods inside of the interface are accessible in this repository, hence we can use them. For example, the all() function returns all the data from the Customer model through the get() method. The same way is applicable to the other functions.

Now, we have an interface and a repository. But, how does it work? Right? How we’re going to access them to a controller. To use that, we need a bridge that actually binds the interface with the repository.

We can use a ServiceProvider class as a bridge. Let’s create a ServiceProvider.

RepositoriesServiceProvider:

```php
<?php
//(Here the App\Repositories is the folder name)
namespace App\Repositories;
use Illuminate\Support\ServiceProvider;

class RepositoriesServiceProvider extends ServiceProvider
{
    public function register()
    {
 $this->app->bind(
   'App\Repositories\TestInterface',
   'App\Repositories\TestRepositoryOne'
 );
    }
}
?>
```

Our ServiceProvider name is RepositoriesServiceProvider. You can name it as your wish. In this ServiceProvider class, we bind the interface with the repository with a register function. Now we have to add them to the Config.php file.

Config.php:

```php
App\Repositories\RepositoriesServiceProvider::class,
```

Now, in the UserController, we can actually use the TestInterface class with a construct function.

UserController:

```php
use App\Repositories\TestInterface;

class UserController extends Controller
{
    protected $test;
    public function __construct(TestInterface $test){
        $this->test = $test;
    }
    //Get the data
    public function index(){
        $data= $this->test->all();
        return view('index', compact(data));
    }
    //Store the data
    public function store(Request $request){
        $this->test->store($request->all());
        return redirect()->route('customer.index');
    }
    //Edit the data
    public function edit($id){
        $data= $this->test->get($id);
        return view('edit', compact(data));
    }
    //Update the data
    public function update($id, Request $request){
        $this->test->update($id, $request->all());
        return redirect()->route('customer.index');
    }
    //Delete the data
    public function delete($id){
        $this->test->delete($id);
        return redirect()->route('customer.index');
    }
}
```

Now, in a normal way of CRUD, we could just implement those functions in the controller, but let’s think we’ve another controller for our Product table that uses the same CRUD system.

So, we’ve to write the same code again and again and that is not a good practice. If we have another controller, it can also implement the same interface TestInterface. So, we don’t have to declare those same functions again.

Also, it’s a very simple CRUD, but what if we have a very complex problem in our application, then it would be very easy to maintain through the different repositories. Our controller will be clean and testing the application will be easy. Another example is, let’s say we are using MySQL and want to change to MongoDB. Since the Repository Pattern uses interfaces, our application logic will remain the same and all we have to do is change out the repository.
