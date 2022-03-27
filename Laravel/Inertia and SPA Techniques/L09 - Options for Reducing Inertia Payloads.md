# Options for Reducing Inertia Payloads

Let's return to API resources and discuss situations where you may need to return a reduced payload to Inertia. It seems wasteful to return a full API resource if a particular view only requires a handful of its attributes. In this episode, I'll show you two options that you might consider for your own projects.

## Multiple API Resources

```php
class ThreadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'author' => UserResource::make($this->author),
            'title' => $this->title,
            'body' => $this-> body,
        ];
    }
}
```

## Resource only() Method

make a share data

```javaScript
 public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => Auth::user() ? [
                'user' => [
                    'username' => Auth::user()->name
                ]
            ]: null,
            'latestThread' => ThreadResource::make(Thread::latest()->first())->only('title', 'author')
        ]);
    }

    
```

instead, you could create a "threadSnapshotResource" for name only
