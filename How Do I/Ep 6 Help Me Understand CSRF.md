VerifyCsrfToken in middleware of kernel.php

How do we verify a token mismatch?

    - tokensMatch method in above class

What happened if no token or token mismatched?

    - above method will throw a exception

How do u set the token?

    - put a random string(Str::random(40)) into a session

        - StartSession middleware group

            - in start() method of Store.php