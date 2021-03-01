# Questions

{% api-method method="get" host="https://leetcodeapi.com/" path="all" %}
{% api-method-summary %}
Get All Questions
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to get a list of all leetcode questions
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Bearer Token" type="string" required=true %}
JWT authentication token that was provided during login or registration
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Questions successfully received
{% endapi-method-response-example-description %}

```
[
    {
        "stat": {
            "question_id":1919,
            "question__article__live":null,
            "question__article__slug":null,
            "question__article__has_video_solution":null,
            "question__title":"Sort Features by Popularity",
            "question__title_slug":"sort-features-by-popularity",
            "question__hide":false,"total_acs":511,
            "total_submitted":720,
            "frontend_question_id":1772,
            "is_new_question":true
        },
        "status":null,
        "difficulty": {
            "level":2
        },
        "paid_only":true,
        "is_favor":false,
        "frequency":0,
        "progress":0
    }, 
...]
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}
Bearer token was invalid
{% endapi-method-response-example-description %}

```
{ "message": "Bearer Token is invalid" }
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://leetcodeapi.com/" path="free" %}
{% api-method-summary %}
Get free questions
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to get a list of all free tier leetcode questions
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Bearer Token" type="string" required=true %}
JWT authentication token that was provided during login or registration
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Questions successfully received
{% endapi-method-response-example-description %}

```
[
    {
        "stat": {
            "question_id":1919,
            "question__article__live":null,
            "question__article__slug":null,
            "question__article__has_video_solution":null,
            "question__title":"Sort Features by Popularity",
            "question__title_slug":"sort-features-by-popularity",
            "question__hide":false,"total_acs":511,
            "total_submitted":720,
            "frontend_question_id":1772,
            "is_new_question":true
        },
        "status":null,
        "difficulty": {
            "level":2
        },
        "paid_only":false,
        "is_favor":false,
        "frequency":0,
        "progress":0
    }, 
...]
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}
Bearer token provided is empty or invalid
{% endapi-method-response-example-description %}

```
{ "message": "Bearer Token is invalid" }
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://leetcodeapi.com/" path="paid" %}
{% api-method-summary %}
Get paid questions
{% endapi-method-summary %}

{% api-method-description %}
This endpoint allows you to get a list of all paid tier leetcode questions
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Bearer Token" type="string" required=true %}
JWT authentication token that was provided during login or registration
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Questions successfully received
{% endapi-method-response-example-description %}

```
[
    {
        "stat": {
            "question_id":1919,
            "question__article__live":null,
            "question__article__slug":null,
            "question__article__has_video_solution":null,
            "question__title":"Sort Features by Popularity",
            "question__title_slug":"sort-features-by-popularity",
            "question__hide":false,"total_acs":511,
            "total_submitted":720,
            "frontend_question_id":1772,
            "is_new_question":true
        },
        "status":null,
        "difficulty": {
            "level":2
        },
        "paid_only":true,
        "is_favor":false,
        "frequency":0,
        "progress":0
    }, 
...]
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}
Bearer token provided is empty or invalid
{% endapi-method-response-example-description %}

```
{ "message": "Bearer Token is invalid" }
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://leetcodeapi.com/" path="free/random" %}
{% api-method-summary %}
Get a random free question
{% endapi-method-summary %}

{% api-method-description %}
This endpoints returns a random question from leetcode free tier questions
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Bearer Token" type="string" required=true %}
JWT authentication token that was provided during login or registration
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Question successfully received
{% endapi-method-response-example-description %}

```
{
    "stat": {
        "question_id":1919,
        "question__article__live":null,
        "question__article__slug":null,
        "question__article__has_video_solution":null,
        "question__title":"Sort Features by Popularity",
        "question__title_slug":"sort-features-by-popularity",
        "question__hide":false,"total_acs":511,
        "total_submitted":720,
        "frontend_question_id":1772,
        "is_new_question":true
    },
    "status":null,
    "difficulty": {
        "level":2
    },
    "paid_only":false,
    "is_favor":false,
    "frequency":0,
    "progress":0
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}
Bearer token provided is empty or invalid
{% endapi-method-response-example-description %}

```
{ "message": "Bearer Token is invalid" }
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://leetcodeapi.com/" path="paid/random" %}
{% api-method-summary %}
Get a random paid question
{% endapi-method-summary %}

{% api-method-description %}
This endpoints returns a random question from leetcode paid tier questions
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Bearer Token" type="string" required=true %}
JWT authentication token that was provided during login or registration
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Question successfully received
{% endapi-method-response-example-description %}

```
{
    "stat": {
        "question_id":1919,
        "question__article__live":null,
        "question__article__slug":null,
        "question__article__has_video_solution":null,
        "question__title":"Sort Features by Popularity",
        "question__title_slug":"sort-features-by-popularity",
        "question__hide":false,"total_acs":511,
        "total_submitted":720,
        "frontend_question_id":1772,
        "is_new_question":true
    },
    "status":null,
    "difficulty": {
        "level":2
    },
    "paid_only":true,
    "is_favor":false,
    "frequency":0,
    "progress":0
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}
Bearer token is empty or invalid
{% endapi-method-response-example-description %}

```
{ "message": "Bearer Token is invalid" }
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="https://leetcodeapi.com/" path="random" %}
{% api-method-summary %}
Get a random question
{% endapi-method-summary %}

{% api-method-description %}
This endpoint returns a random question from the full list of leetcode questions
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Bearer Token" type="string" required=true %}
JWT authentication token that was provided during login or registration
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Question successfully received
{% endapi-method-response-example-description %}

```
{
    "stat": {
        "question_id":1919,
        "question__article__live":null,
        "question__article__slug":null,
        "question__article__has_video_solution":null,
        "question__title":"Sort Features by Popularity",
        "question__title_slug":"sort-features-by-popularity",
        "question__hide":false,"total_acs":511,
        "total_submitted":720,
        "frontend_question_id":1772,
        "is_new_question":true
    },
    "status":null,
    "difficulty": {
        "level":2
    },
    "paid_only":true,
    "is_favor":false,
    "frequency":0,
    "progress":0
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}
Bearer token is empty or invalid
{% endapi-method-response-example-description %}

```
{ "message": "Bearer Token is invalid" }
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

