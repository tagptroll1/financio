# Financio
A web application used to store, monitor and visualize income and expenses.


## Endpoints

### `/api/user`

#### <u>__GET__</u>
Gets a user from the system with user information and finance data.  The GET requests requires authorization through the `Authorization` header with *username:password* or *email:password* encoded in base64.


Example request:
```http
GET http://localhost:5000/api/user 
Authorization: Ym9ibWFuMTpib2IxMjM=
```


Returns an JSON of shape 
```json
{
    "message": "A message about the request, usually OK",
    "datakey": "some-auto-generated-key",
    "user": {
        "username": "bobman1",
        "email": "bob@hotmail.com",
        "joinedDate": "Date",
        "lastActive": "Date",
        "finance": {
            "..."
        } 
    }
}
```



#### <u>__PATCH__</u>
Edits a users profile.  
Can edit email with authentication from the Authorization header. 
`Authorization` header requires *username:password* or *email:password* encoded in base64.

Can edit password by passing email or username in the body, 
the Authorization header must be omitted for this to go through.
This sends a reset password url to the users email.


Example request:
```http
TODO
```


Returns a JSON of shape
```json
{
    "message": "A message about the request, usually OK"
}
```



#### <u>__DELETE__</u>
Deletes a user profile.
The request requires authentication through the `Authorization` header 
with *username:password* or *email:password* encoded in base64.  
If the user in the header has Admin permissions can a username, 
email or id be passed in the body to delete other user profiles.
Else it defaults to deleting the account associated with the request.


Example request:
```http
DELETE http://localhost:5000/api/user 
Authorization: Ym9ibWFuMTpib2IxMjM=
```

```http
DELETE http://localhost:5000/api/user 
Authorization: YWRtaW46YWRtaW4K

{
    "username": "bobman1"
}
```

**Warning!**
This does prompt any second verifications, once the request is sent 
then the account is permantantly deleted!


Returns a JSON of shape
```json
{
    "message": "A message about the request, usually OK",
    "user": {
        "email": "bob@hotmail.com",
        "username": "bobman1",
        "joinedAt": "Date",
        "lastactive": "Date",
        "finance": {
            "..."
        }
    }
}
```
This is to recreate the account incase of accidental deletion.



### `/api/user/new`
#### <u>__POST__</u>
Creates a new user account in the system
This new account will have a finance field set to null by default.

Required fields are:
* username
* email
* password


Example request:
```http
POST http://localhost:5000/api/user/new 
Content-Type: application/json

{
    "username": "bobman1", 
    "email": "bob@hotmail.org", 
    "password": "bob123"
}
```


Passwords are never stored, not even hashed.  They are used to decrypt the datakey
which are in turn used to decrypt all the users data.  The client is responsible 
for keeping this key after requesting it and adding it to any data related queries.  


Returns a JSON of shape
```json
{
    "message": "A message about the request, usually OK",
    "datakey": "some-auto-generated-key",
    "user": {
        "email": "bob@hotmail.com",
        "username": "bobman1",
        "joinedAt": "Date",
        "lastActive": "Date",
        "finance": null
    }
}
```
Or if the account already exists
```json
{
    "message": "Account already exists"
}
```

