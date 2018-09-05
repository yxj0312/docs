# August 30th
## Recommend level: 
:star: - Not worth to watch

:star::star: - Not recommended

:star::star::star: - Something useful or intersting or can learn somthing from

:star::star::star::star: - Very useful, should watch

:star::star::star::star::star: -  Very useful, best performance, must see

## 9:30 - 10:30: 
### Build bridges, not walls—Design for users across cultures (:star::star::star:)

- taiwan borned girl talked about culture difference, intesting, less useful for my job.
- lots of fun things about culture difference, for example:
    - German:
        1. Trust logos from trustshops.de
        2. Reviews from German customers
        3. German customers in roster
        4. Accepted payment methods
        5. Company description in footer
    - Chinese
        1. Typing Chinese takes a long time and finding the precise word isn't easy
        2. Search sucks, so optimize for browsing
      

## 10:30 - 11:05:
### Zero to API with Lumen (:star::star::star:)

- very basic, short speech
- if you are new to lumen, or if you have no idea what is an api, you should watch this video
- some notes:
    
    - Routing difference between laravel and lumen
    
    ```php
        // Laravel Routing
        Route::get('/', function(){
            return view('welcome');
        });
        
        // Lumen Routing
        $router->get('/', function() use($router) {
            return $router->app->version();
        })
    ```
    - Differences in Artisan
        - No 'serve' command
        - No 'key:generate'
        - No 'tinker'
        - No 'env'
        - No 'down'
        - No 'vendor:publish'
        - Only has 'make:migration' and 'make:seeder'
        - No 'make:model'
        - No 'make:controller'
        - No 'make:auth' + scaffolding 
            - AuthServiceProvider provided(uncommented in app.php)
            - JWT
            - Authentication middleware like 
            ```php
            $router->group(['middleware' => 'jwt.auth'],function() use($router){
            ....
            })
            ```
        - Many more since Lumen is slimmed down
    
- some good examples about how to write apis:

    there are apis example about pokemon, which are very clearly sturctured, could be useful for our work
    

## 11:50 - 12:40:
### Twelve-Factor Apps (:star::star::star:)

- very useful principles
- some of them I do not quite unstand, need to watch the record again
- some notes(not all):
    - One codebase for one application
    - If it only exists in production, it doesn't exist at all
    - Git commit your vendor directory -> :scream:
    - Bake system/PHP libraries into your server/Docker image
    - Strict separation from code
    - .env file considered harmful (very intersting, should see!)
        - Simple solutions:
            1. Store your config encrypted in cloud storage
            2. Download on deployment
            3. For each variable, export into enviroment
            4. Run your app
            5. Example:
            ```php
               #!/user/bin/env bash
               aws s3 cp s3://my-bucket/config-vars config-vars
               export $(cat config-vars | xargs) && php -fpm
            ```
        - Better solutions:
            - AWS Secrets / Parameter Store(SSM)
            - Kubernetes Secrets
            - Hashicorp Vault
            - Heroku Config
    - If you care about your data, use managed database hosting
            
            

## 13:40 - 14:40:
### Migrating a 15 Year Old Enterprise Application to Laravel: Lessons Learned and Opportunities Gained (:star::star:)

- actually not talking about lesson learned, just talking about 'jokes' earned
- lots of talks are about how laravel is good for long time maintance
- good example of enterprise workflow
- jebaited :(
- some notes:
    - use laravel caching
    - laravel security(list some laravel security features here, meaningless for this topic, I think)
    - tell us, they use ciclecl to run npm install/phpunit/jest after commiting of github (which also useless, and many other productions can also do these things)
    - they use aws and saucelabs, which is good :sleepy:
    - introduce their products, which are less related with this topic
    



## 14:40 - 15:30:
### Content Security Policy 101 by Christoph Rumpel (No star here, cause this took place at unconference, hasn't been recoreded)

- brand new stuffs for me
- interesting
- [Wiki](https://de.wikipedia.org/wiki/Content_Security_Policy)
- ~missed something due to going to the toilets~

## 16:00 - 17:00:
### Handling media in a Laravel application

- best of the day
- very useful package, which can be used in all of our project, right now!
- [links at Laracon US 2018](https://www.youtube.com/watch?v=3eyftAR5ilo)
- ~I'm so tired, and felt asleep, but still best of the day!~
- some introduction:
    - [Medialibrary is a Laravel (5.6 and up) package that can associate all sorts of files with Eloquent models. It provides a simple, fluent API to work with.](https://docs.spatie.be/laravel-medialibrary/v7/introduction)
        - Working with media collections
        - Converting images
        - Responsive images
        - Converting other file types
        - And other cool stuffs, like: Working with multiple filesystems

## 17:00 - 18:15:
### 5 [fun] ways to fall in love [again] with code

- try to be fun, but actually very boring
- and extremly long (15 minutes overtime)
- christopher should read those actor's lines, which are written in the slides and belongs to him. But he didn't, and made that girl a little bit nervous :D
- at least, I know php and js can do more intersting(maybe) things

# August 31th
## 09:30 - 10:30:
### Fundamentally Flawed: Privacy, People and the Age of Data

- 2nd best of the day
- talk about importance of privacy, data security
- very fluent English and perfect performance
- very clever guy

## 10:30 - 11:20:
### Things every developer absolutely, positively needs to know about database indexing

- best of the day or maybe best speech I've ever seen
- best slides, less and concise words, beautiful font, 
- perfect live coding
- humor
- focus on little things, not just talk in generalities

## 11:50 -  12:40
### Crypto for Everyone

- master of php
- more like a professer, giving a lecture
- lack of laravel example
- stuffy room makes me tried and felt asleep again

## 13:40 - 14:40
### Laravel Design Patterns

- I know him! the guy always been seen at laracast community
- basic knowledge, but many examples from laravel
- 4st best speech of the day

## 14:40 - 15:30
### Advanced animations with Vue.js: taking your interface to the next level

- very beautiful and intersting examples
- less talk but always talk about key point, which is good
- best slides in this laracon

## 16:00 - 17:00
### SOLID Design Principles

- very good examples
- 3nd best speech of the day

## 17:00 - 17:40
### State of Laravel

- really really short
- At the first day, when I took a picture with Taylot, I asked him, will his speech take a long time like the one in Laracon US this year.
And he answered, no, just 45 minutes.
but come on, it's only 40 min, and u actually started at 17:05. lol

