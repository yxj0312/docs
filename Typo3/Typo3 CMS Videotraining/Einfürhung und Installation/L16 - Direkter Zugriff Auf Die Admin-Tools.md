# L16 - Direkter Zugriff Auf Die Admin-Tools

go to /typo3/install.php

get:

```
The Install Tool is locked
To enable the Install Tool, the file ENABLE_INSTALL_TOOL must be created in the directory typo3conf/. The file must be writable by the web server user. The filename is case-sensitive but the file itself can be empty.

Security note: When you are finished with the Install Tool, you should rename or delete this file. It will automatically be deleted if you log out of the Install Tool or if the file is older than one hour.

```

use

```ddev exec touch public/typo3conf/ENABLE_INSTALL_TOOL```

-> ddev führt ein Befehl auf dem Webserver (Container) aus
