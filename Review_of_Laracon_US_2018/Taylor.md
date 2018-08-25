# Keynote
### Speaker: Taylor Otwell
### Schedule: 2017.7.25 17:30
### Duration: 1:32:49
### Links: [Taylor Otwell - Keynote - Laracon US 2018](https://www.youtube.com/watch?time_continue=149&v=pLcM3mpZSV0)
### Contents:

#### New Features of laravel 5.7:
- Email verification: 
    ```php
    MustVerifyEmail
    ```
- Policy can be called with 'guest' users(aren't logged in)

- Dump server from Symphony: 
    ```php 
    php artisan dump-server
    ``` 

- handful of other small quality improvements syntax for route action urls

- **Laravel Nova**

    - a single pageview application
    - using tailwind css
    - using laravel + vue
    - laravel json api feeding all this data
    - CRUD scenarios (10:13 - 17:41)
    - data field
        - timezone auto offset with DB and browser time (~19:11)
        - blog text area: 
            - markdown/Trix editor
            - Code field: display json data(or other language like php)
                ```php
                Code::make('Options')->json()->rules('json')
                ```
    - file field: for file upload (begin at 23:46)
        - got image preview
        - got overwrite hook
        - prunable():if only delete the resource, the underlying file in the storage system will also be deleted
    - belongsTo field: dropdown menu can be searchable
        - use laravel scout
        - algolia or other search system are also supported
    - global search: can search all of the resources
    - place field: tracking address(built by algolia)
        ```php
        Place::make('Address','address_line_1')
        ```
    - relationship
        - many to many: do well with pivot table column
        - polyMorph
        - softdeleting: 'withTrashed' option button to show the trashed results
    - avatar can be cached and searched
    - own filter: will be avaiable by all tables and search
        - have CLI generator for it
    - lenses: similar to filter, but more a radical way of looking at a resource
        - i.e. a lense called most valuable users
          ```php
          public static function query(LensRequest $request, $query)
          {
              return $request->withOrdering($request->withFilters(
                query->select('users.id', 'users.name', 
                        DB::raw('sum(licenses.price) as revenue'))
                    ->join('licenses', 'users.id', '=', 'licenses.user_id')
                    ->orderBy('revenue', 'desc')
                    ->groupBy('users.id', 'users.name')
              ));
          }
          ```
          click this will jump to a new view of users
          and filter is still reused, attach all the filter
    - actions: i.e a new action: deactivate
        ```php
        <!-- in User -->
        public function actions(Request $request)
        {
            return [
                new Actions\Deactivate,
            ]
        }
        ```
        - not only for tables, but also for single user
        - actionable trait for indication all your actions
        - can also attach to pivot table

            -- Play WOW all the day and already 120 --
        - helper function: referToPivotAs()
    - metrics: three types of metrics
        - value metric
        - trend metric
        - partition metric
        - can be cached
    - authorization - 1:13:00
        - can also be used by custom actions/fields
    - custom
        - custom tools: create Tool.vue
        - custom resource tools
            - for example: a stripeInspector
        - custom fields
        - custom cards
    
    [Website: https://nova.laravel.com/](https://nova.laravel.com/)

    $99/site for solo, $199/site for team (like Spark)