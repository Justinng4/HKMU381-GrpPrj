CREATE (POST) - Add a new user
curl -X POST http://hkmu381-grpprj.onrender.com \
-H "Content-Type: application/json" \
-d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}'


Get all users
curl https://hkmu381-grpprj.onrender.com/users

Get specific user by ID
curl http://localhost:3001/users/6745a541bf24ca689a929934

Get with query parameters (if implemented)
curl http://localhost:3001/users?limit=10
curl http://localhost:3001/users?sort=name

UPDATE (PATCH) - Update user info
Update single field
curl -X PATCH http://localhost:3001/users/6745a541bf24ca689a929934 \
-H "Content-Type: application/json" \
-d '{"name": "Updated Name"}'

Update multiple fields
curl -X PATCH http://localhost:3001/users/6745a541bf24ca689a929934 \
-H "Content-Type: application/json" \
-d '{
    "name": "New Name",
    "email": "newemail@example.com"
}'

DELETE - Remove user
curl -X DELETE http://localhost:3000/users/6745a541bf24ca689a929934
