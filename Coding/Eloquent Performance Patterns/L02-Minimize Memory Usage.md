# Minimize Memory Usage

>In this lesson, we'll review how to minimize memory usage by only selecting the data that we actually require from the database.

We have a blog system.

```php
class PostsController extends Controller
{
    public function index()
    {
        $years = Post::query()
            ->with('author')
            ->latest('published_at')
            ->get()
            ->groupBy(fn ($post) => $post->published_at->year);

        return View::make('posts', ['years' => $years]);
    }
}

```

let's take a look at debugbar

Memory usage: ~ 20MB

Queries:

- select * from 'posts' order by 'published_at' desc
- select * from 'users' where 'users'.'id' in (1,2,3,4...)

Why so many?

cause we select all from the posts, which included post's body (article), which is large

Let's update our query:

```php
class PostsController extends Controller
{
    public function index()
    {
        $years = Post::query()
        // id for eloquent requirement
        // author id for eager loading
            ->select('id', 'title', 'slug', 'published_at', 'author_id')
            ->with('author')
            ->latest('published_at')
            ->get()
            ->groupBy(fn ($post) => $post->published_at->year);

        return View::make('posts', ['years' => $years]);
    }
}

```

And now our memory usage down to 4.35MB

you can use the same technique with your relationship

```php
class PostsController extends Controller
{
    public function index()
    {
        $years = Post::query()
        // id for eloquent requirement
        // author id for eager loading
            ->select('id', 'title', 'slug', 'published_at', 'author_id')
            ->with(['author' => function(query){
                $query->select('id', 'name');
            }])
            ->latest('published_at')
            ->get()
            ->groupBy(fn ($post) => $post->published_at->year);

        return View::make('posts', ['years' => $years]);
    }
}

```

or even more clear

```php
class PostsController extends Controller
{
    public function index()
    {
        $years = Post::query()
        // id for eloquent requirement
        // author id for eager loading
            ->select('id', 'title', 'slug', 'published_at', 'author_id')
            ->with('author:id,name')
            ->latest('published_at')
            ->get()
            ->groupBy(fn ($post) => $post->published_at->year);

        return View::make('posts', ['years' => $years]);
    }
}

```

When should you use the technique?

Not for all the pages, tend to find this technique most useful on pages that interact with a lot of database records, such as index pages, exports functions.

keep eye on your memory usage
