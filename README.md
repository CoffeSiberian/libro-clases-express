## Backend server for the app [libro-clases-react](https://github.com/CoffeSiberian/libro-clases-react "libro-clases-react")

###### Development executed for the university based on a problem.

**DANGER**
**DO NOT USE THE CREDENTIALS IN keys IF YOU INTEND TO USE THE PROJECT.**

You can generate new credentials with the following commands.
```bash
openssl genrsa -out jwt-key 4096
openssl rsa -in jwt-key -pubout > jwt-key.pub
```
Requirements *(based on what was used for development)*

- Node.js v18.11.0
- MySQL (MariaDB) 10.4.25-MariaDB
- OpenSSL 1.1.1 *(To create the JWT credentials)*