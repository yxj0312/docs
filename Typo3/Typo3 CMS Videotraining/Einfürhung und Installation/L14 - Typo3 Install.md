# Install

1. cd public go to <https://get.typo3.org/misc/composer/helper>

    can choose typo3/full or customize

    copy and parse them to console with ddev at begining....

    i.e ein full version with

    ```php

    ddev composer require "typo3/cms-adminpanel:^11.5" "typo3/cms-backend:^11.5" "typo3/cms-belog:^11.5" "typo3/cms-beuser:^11.5" "typo3/cms-core:^11.5" "typo3/cms-dashboard:^11.5" "typo3/cms-extbase:^11.5" "typo3/cms-extensionmanager:^11.5" "typo3/cms-felogin:^11.5" "typo3/cms-filelist:^11.5" "typo3/cms-filemetadata:^11.5" "typo3/cms-fluid:^11.5" "typo3/cms-fluid-styled-content:^11.5" "typo3/cms-form:^11.5" "typo3/cms-frontend:^11.5" "typo3/cms-impexp:^11.5" "typo3/cms-indexed-search:^11.5" "typo3/cms-info:^11.5" "typo3/cms-install:^11.5" "typo3/cms-linkvalidator:^11.5" "typo3/cms-lowlevel:^11.5" "typo3/cms-opendocs:^11.5" "typo3/cms-recordlist:^11.5" "typo3/cms-recycler:^11.5" "typo3/cms-redirects:^11.5" "typo3/cms-reports:^11.5" "typo3/cms-rte-ckeditor:^11.5" "typo3/cms-scheduler:^11.5" "typo3/cms-seo:^11.5" "typo3/cms-setup:^11.5" "typo3/cms-sys-note:^11.5" "typo3/cms-t3editor:^11.5" "typo3/cms-tstemplate:^11.5" "typo3/cms-viewpage:^11.5" "typo3/cms-workspaces:^11.5"

    ```

2. then u can install

    ```php
    ddev composer require helhum/typo3-console
    ```

3. run

   ```php
   ddev typo3cms install:setup
   ```

4. Enter username und pw
5. set up configuration (could no)
6. choose webserver (apache)
