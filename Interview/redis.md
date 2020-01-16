Here will show some examples of redis usage.
1. Install redis libarary by composer install predis
2. Commands: 
```redis
redis-cli
zincrby 'trending_threads' 1 'Some thread title'
zincrby 'trending_threads' 1 'Another thread title'
zrange 'trending_threads'  0 -1 WITHSCORES
zrevrange 'trending_threads'  0 -1 WITHSCORES
del 'trending_threads'
```
3.Test:
```php
/** @test */
function it_increments_a_threads_score_each_time_it_is_read()
{
    $this->assertCount(0. Redis::zrevrange('trending_threads', 0, -1));

    $thread = create('App\Thread');
    
    $this->call('GET', $thread->path());

    $trending = Redis::zrevrange('trending_threads', 0, -1);

    $this->assertCount(1, $trending);

    $this->assertEquals($thread->title, json_decode($trending[0])->title);
}


public function show($channel, Thread $thread)
{
    if (auth()->check()) {
        auth()->user()->read($thread);
    }

    // Redis::incrby('trending_threads', 1, $thread->id);
    // Throw them all in the redis, in that way u never have to make a database query
    Redis::incrby('trending_threads', 1, json_encode([
        'title' => $thread->title,
        'path' => $thread->path()
    ]));

    return view('threads.show', compact('thread'))
}

public function index($channel, ThreadFilters $filters)
{
    $threads = $this->getThreads($channel, $filters);

    if (request()->wantsJson()) {
        return $threads;
    }

    $trending = array_map('json_decode', Redis::zrevrange('trending_threads', 0, -1));
    // $trending = collect(Redis::zrevrange('trending_threads', 0, -1))->map(function ($thread){
    //     return json_decode($thread);
    // });

    return view('threads.index', compact('threads', 'trending'));
}
```