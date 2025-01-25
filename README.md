To run the server

`node index.js`


# To test the endpoints :

## To signup a new user
```bash
curl -X POST http://localhost:3000/auth/signup \
-H "Content-Type: application/json" \
-d '{
    "name": "John Doe",
    "email": "john.doe@example.com"
}'
```

## To login a user

```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
    "email": "john.doe@example.com"
}'
```