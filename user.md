# API Descriptions

[REPO](https://github.com/Exodus-Technologies/Carbon)

## Table of contents

- [Home](#home)
- [Probe Check](#probe-check)
- [Login](#login)
- [SignUp](#signup)
- [Change Password](#change-password)
- [Get Users](#get-users)
- [Create User](#create-user)
- [Update User](#update-user)
- [Delete User](#delete-user)

## Home

- The first endpoint that was created with this API. This is a GET API that returns a json with a statusCode of 200 and a message of Welcome to Carbon Auth Manager Service!

[Home Url](http://auth.services-exodustechnologies.com/auth-service/)

Example response:

```
{
    message: 'Welcome to Carbon Auth Manager Service!'
}
```

## Probe Check

- The endpoint that serves as a healthcheck url. You would hit this url if you need to verify that the API is up and running. This is a GET API that returns a json with a statusCode of 200 and a message of Carbon Auth Manager service up and running!

[ProbeCheck Url](http://auth.services-exodustechnologies.com/auth-service/probeCheck)

Example response:

```
{
    message: 'Carbon Auth Manager service up and running!'
}
```

## Login

- This endpoint was created so that users that have been created and saved to our database can authenicate with our services. This is a POST API that returns 3 responses depending on the situation.

[Login Url](http://auth.services-exodustechnologies.com/auth-service/login)

Example payload:

```
{
    email: "moderator@sheenmagazine.com",
    password: "BlackFreedom2020!*"
}
```

1. Returns below for a user that exists and provided the correct password corresponding to that user:

```
{
    "message": "Successful login",
    "user": {
        "email": "moderator@sheenmagazine.com",
        "fullName": "Jane Doe",
        "gender": "F",
        "city": "Los Angeles",
        "state": "CA",
        "userId: 5,
        "zipCode": "90001",
        "isAdmin": true
    }
}
```

2. Returns below for a user that does not exist in our database:

```
{
  "errors": [
    {
      "value": "Bad Request",
      "msg": "User does not exist."
    }
  ]
}
```

3. Returns below for a user that provided a valid email but their password was incorrect:

```
{
  "errors": [
    {
      "value": "Bad Request",
      "msg": "Incorrect credentials used for login."
    }
  ]
}
```

4. Returns below for a user that provided a invalid password:

```
{
  "errors": [
    {
      "value": "sfasfasgasfdsaf",
      "msg": "Please enter a password at least 8 character and contain at least one uppercase, least one lower case, and at least one special character.",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## SignUp

- The endpoint that allows customer to self signUp to use the application. This is a POST API that returns 2 responses depending on the situation.

[SignUp Url](http://auth.services-exodustechnologies.com/auth-service/signUp)

Example payload:

## NOTE: All of the fields shown are required.

```
{
    "email": "moderator@sheenmagazine.com",
    "password": "BlackFreedom2020!*",
    "fullName": "Jane Doe",
    "gender": "F",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90001",
    "isAdmin": true
}
```

All possible gender

```
['M', 'F']
```

1. Returns below for a user that was successfully created:

```
{
    message: "User created with success"
}
```

2. Returns below for a user that is trying to use an email that exists in our database:

```
{
  "errors": [
    {
      "value": "Bad Request",
      "msg": "User with email already exists."
    }
  ]
}
```

3. Returns below for invalid parameters:

```
{
  "errors": [
    {
      "value": "testmem.s",
      "msg": "Please enter a password at least 8 character and contain at least one uppercase, least one lower case, and at least one special character.",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## Change Password

- This endpoint was created so that users that have been created and saved to our database can change their password if they have forgotten it. This is a POST API that returns 4 responses depending on the situation.

[Change password Url](http://auth.services-exodustechnologies.com/auth-service/changePassword)

Example payload:

```
{
    email: "drobinson@sheen-magazine.com",
    password: "BlackFreedom2020!*",
    code: "XqolHS"
}
```

1. Returns below for a user that exists and provided the correct password corresponding to that user:

```
{
   message: 'Password reset success.'
}
```

2. Returns below for a user that does not exist in our database:

```
{
    error: "Bad Request",
    message: "Email does not belong to any registered user."
}
```

3. Returns below for a user that provided an invalid code:

```
{
    error: "Bad Request",
    message: "The code is invalid."
}
```

4. Returns below for a user that provided the code is no longer valid:

```
{
    error: "Bad Request",
    message: "The code is no longer valid."
}
```

## Request password reset

- This endpoint was created so that users can request a code send to their email to change password. The code contains 6 character and will be expire in 20 minutes. This is a POST API that returns 2 responses depending on the situation.

[Change password Url](http://auth.services-exodustechnologies.com/auth-service/changePassword)

Example payload:

```
{
    email: "drobinson@sheen-magazine.com"
}
```

1. Returns below for a user that exists and provided the correct password corresponding to that user:

```
{
   message: 'Password reset success, an email has been sent to your email with the code to reset your password. The code is only valid for 20 minutes.'
}
```

2. Returns below for a user that does not exist in our database:

```
{
    error: "Bad Request",
    message: "User not found."
}
```

## Get Users

- This endpoint was created so that users that have been created and saved to our database can authenicate with our services. This is a GET API that returns 2 responses depending on the situation.

[Get Users Url](http://auth.services-exodustechnologies.com/auth-service/getUsers)

Example query params:

```
page=1&limit=4&gender=F&city=Los Angeles&state=CA&zipCode=90001
```

## NOTE: All of the fields shown are optional EXCEPT page and limit.

1. Returns all users that meet the criteria in the query string:

```
{
    "message": "Fetcing of users action was successful.",
    "users": [
        {
            "email": "publisher@sheenmagazine.com",
            "password": "$2b$10$tMsp.wRky59pdAjmO9J72eWyUhbCtjbU.oDuDYLyZ.5nE1dtBUYq2",
            "fullName": "Jon Doe",
            "gender": "M",
            "city": "Los Angeles",
            "state": "CA",
            "zipCode": "90001",
            "isAdmin": true,
            "createdAt": "2022-04-05T03:01:04.445Z",
            "updatedAt": "2022-04-05T03:01:04.445Z",
            "userId": 2
        }
    ]
}
```

2. Returns bad request for missing parametters:

```
{
    "errors": [
        {
            "msg": "Invalid value",
            "param": "page",
            "location": "query"
        },
        {
            "msg": "Must provide a page for users",
            "param": "page",
            "location": "query"
        },
        {
            "msg": "Invalid value",
            "param": "limit",
            "location": "query"
        },
        {
            "msg": "Must provide a limit for users",
            "param": "limit",
            "location": "query"
        }
    ]
}
```

## Create User

- The endpoint that allows admin to create users to use the application. This is a POST API that returns 2 responses depending on the situation.

[Create User Url](http://auth.services-exodustechnologies.com/auth-service/createUser)

Example payload:

## NOTE: All of the fields shown are required.

```
{
    "email": "ivytest@yopmail.com",
    "password": "BlackFreedom2020!*",
    "fullName": "Jane Doe",
    "gender": "F",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90001",
    "isAdmin": true
}
```

Roles

```
 ['publisher', 'moderator', 'subscriber']
```

All possible gender

```
['M', 'F']
```

1. Returns below for a user that was successfully created:

```
{
    message: "User created with success"
}
```

2. Returns below for a user that is trying to use an email that exists in our database:

```
{
  "errors": [
    {
      "value": "Bad Request",
      "msg": "User with email already exists."
    }
  ]
}
```

3. Returns below for invalid parameters:

```
{
  "errors": [
    {
      "value": "testmem.s",
      "msg": "Please enter a password at least 8 character and contain at least one uppercase, least one lower case, and at least one special character.",
      "param": "password",
      "location": "body"
    }
  ]
}
```

## Update User

- The endpoint that allows admin to update users to use the application. This is a PUT API that returns 3 responses depending on the situation.

[Update User Url](http://auth.services-exodustechnologies.com/auth-service/updateUser/:userId)

Example payload:

```
{
    email: 'blastor555@yopmail.com',
    password: 'BlackFreedom2020!*',
    fullName: 'Ivy Jones',
    gender: 'F',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001'
}
```

Roles

```
 ['publisher', 'moderator', 'subscriber']
```

All possible gender

```
['M', 'F']
```

1. Returns below for a user that was successfully created:

```
{
    "message": "User was successfully updated.",
    "user": {
        "email": "moderator@sheenmagazine.com",
        "fullName": "Jane Doe",
        "gender": "F",
        "city": "Los Angeles",
        "state": "CA",
        "zipCode": "90001",
        "isAdmin": true
    }
}
```

2. Returns below for trying to change the user email:

```
{
  "errors": [
    {
      "value": "Bad Request",
      "msg": "Unable to change email."
    }
  ]
}
```

3. Return for the invalid parameters:

```
{
    "errors": [
        {
            "value": "Male",
            "msg": "Gender submitted is not allowed for this field.",
            "param": "gender",
            "location": "body"
        }
    ]
}
```

## Delete User

- The endpoint that allows admin to delete users to use the application. This is a PUT API that returns 2 responses depending on the situation.

[Delete User Url](http://auth.services-exodustechnologies.com/auth-service/deleteUser/:userId)

Example url with params:

```
http://auth.services-exodustechnologies.com/auth-service/deleteUser/4
```

Example response:

```
204
```
