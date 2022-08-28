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
    }
}

```
