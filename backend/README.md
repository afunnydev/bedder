# Backend

The backend of the project uses Symfony. The current version is Symfony 4.3.

## Setup

Install the dependencies

```
composer install
```

Create your environment variables

```
touch .env.local
nano .env.local
```

and overwrite any necessary variables from the ```.env``` file.

## Routing

We use **annotations** to make the routing of our application. The routing is annotated directly in our controllers (https://symfony.com/doc/current/routing.html)

## Database

This project uses Doctrine as an ORM for a MySQL database.

### Starting the development server

```
symfony server:start
```

### Migrations

During the release phase of each Heroku deploy, the database migrations are executed. Simply make sure to generate them in your commit by using ```php bin/console doctrine:migrations:diff```. *This could be automated to run in pre-commit, but it currently isn't.*.

## Authentication

## Email Templates

All email templates are currently in ```templates/email```. We are using the Symfony Mailer and Twig.

You can add a new email template by adding a new .html.twig file in this folder with the following infrastructure.

```
{% extends 'email/email-base.html.twig' %}

{% block title %}
    This is the title of the email in the HTML
{% endblock %}

{% block preview %}
    This is the small text that the user will see without opening the email. Keep it short (< 100 chars)
{% endblock %}

{% block body %}
    This is the body of your email, in HTML.
{% endblock %}
```

If you want to embed images, upload them on Uploadcare and use their link, it will be easier.

## SMS Templates

All SMS templates are currently in ```templates/sms```. We are using some XML templates.

You can send an SMS message by using the Twilio Client. It is already included in the SmsService.

```
$this->twilio->messages->create(
    '+15146383539',
    array(
        'from' => $this->twilio_number,
        'body' => 'I sent this message in under 10 minutes!'
    )
);
```

You can answer to a API call from Twilio so that Twilio answer a received SMS with another SMS.

```
$response = new Response($this->renderView(
    'sms/accept.xml.twig'
));
$response->headers->set('Content-Type', 'text/xml');

return $response;
```

## API Utils

When the ressource is not found:

```
throw new NotFoundHttpException("Useful message here please.");
```

When the action is forbidden:

```
throw new HttpException(403, "Useful message here please.");
```

