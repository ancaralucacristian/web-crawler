# web-crawler

This project contains a .env that needs to be instantiated as below so that the process environments are given to the program.

.env 
```
START_URL=https://monzo.com
DOMAIN_BASE=monzo
OUTPUT_FILE_NAME=output.json
```

Use npm start to start the program, it will print out the url scanned with the count of links inside.

The output.json contains the entire scan of the site with all the links, innerLinks and count of inner links.

(For local testing, I have added the .env as well, however, the variables should be provided depending on the environment where it runs.)