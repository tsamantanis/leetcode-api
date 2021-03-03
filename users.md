# Users

{% api-method method="get" host="https://leetcodeapi.com" path="/users/:id" %}
{% api-method-summary %}
Get User
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to get free cakes.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" %}
ID of the user to get
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}

{% api-method-headers %}
{% api-method-parameter name="Bearer Token" type="string" required=true %}
Authentication token to track down who is attempting to request user data. The Bearer Token should be a JWT token
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Response includes a user object
{% endapi-method-response-example-description %}

```text
{
    "user": {
         "_id": "6036b28379d32691e259d85b",
         "email": "example@example.com",
         "questions": [
              // question objects
         ]
    }
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="https://leetcodeapi.com/users/new" path="" %}
{% api-method-summary %}
New User
{% endapi-method-summary %}

{% api-method-description %}
Create a new User
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="password" type="string" required=true %}
User password. Minimum length is 8 characters
{% endapi-method-parameter %}

{% api-method-parameter name="email" type="string" required=true %}
User email address
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Response includes a user object with the newly created API Key both as a field and as a cookie.
{% endapi-method-response-example-description %}

```text
{
    "user": {
         "_id": "6036b28379d32691e259d85b",
         "email": "example@example.com",
         "questions": [],
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwM2NmNGE0MGYzOGZjNWMyNjhjZTgwMyIsImVtYWlsIjoiY29mZmVlYW5kY29va2llQG1haWxpbmF0b3IuY29tIiwiYXBpS2V5IjoiMTA2MDUwNDVhZTJmMDAxMzI4MWUwOWJkZTNlZDk1NDIiLCJxdWVzdGlvbnMiOltdLCJleHAiOjE2MzAxNTYwNDQsImlhdCI6MTYxNDYwNzY0NH0.iE4jSFH1PM7PF7QpeOsBaQiMrkkyA6aERgh_9kKaCzk"
    }
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="https://leetcodeapi.com/users/login" path="" %}
{% api-method-summary %}
Login User
{% endapi-method-summary %}

{% api-method-description %}
Create a new User
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="password" type="string" required=true %}
User password. Minimum length is 8 characters
{% endapi-method-parameter %}

{% api-method-parameter name="email" type="string" required=true %}
User email address
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Response includes a user object with their corresponding API Key both as a field and as a cookie
{% endapi-method-response-example-description %}

```text
{
    "user": {
         "_id": "6036b28379d32691e259d85b",
         "email": "example@example.com",
         "questions": [],
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwM2NmNGE0MGYzOGZjNWMyNjhjZTgwMyIsImVtYWlsIjoiY29mZmVlYW5kY29va2llQG1haWxpbmF0b3IuY29tIiwiYXBpS2V5IjoiMTA2MDUwNDVhZTJmMDAxMzI4MWUwOWJkZTNlZDk1NDIiLCJxdWVzdGlvbnMiOltdLCJleHAiOjE2MzAxNTYwNDQsImlhdCI6MTYxNDYwNzY0NH0.iE4jSFH1PM7PF7QpeOsBaQiMrkkyA6aERgh_9kKaCzk"
    }
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

