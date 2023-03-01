## Backend server for the app [libro-clases-react](https://github.com/CoffeSiberian/libro-clases-react "libro-clases-react")

###### Development executed for the university based on a problem.

**DANGER**
**DO NOT USE THE CREDENTIALS IN keys IF YOU INTEND TO USE THE PROJECT.**

You can generate new credentials with the following commands.
```bash
openssl genrsa -out jwt-key 4096
openssl rsa -in jwt-key -pubout > jwt-key.pub
```
#### First setup

First you will have to set the environment variable "INSTALLED" to false to be able to enter a user with the range you like (clearly 10 is the maximum).

This environment variable will enable an endpoint called /config to which you will have to execute a POST request with the following structure

```json
{
  "rut":"x.x.x-x",
  "name":"Your Name",
  "pass":"123456",
  "rank":10
}
```
After running and being able to log in, change the environment variable to "true" so that it disables this endpoint (you can also comment out the path line for more security [here](https://github.com/CoffeSiberian/libro-clases-express/blob/a2bd5f93ac18fc443f93d1ee30a6b8343fc994df/routes/routes.ts#L58 "here"))

Requirements *(based on what was used for development)*

- Node.js v18.11.0
- MySQL *(MariaDB)* 10.4.25-MariaDB
- OpenSSL 1.1.1 *(To create the JWT credentials)*