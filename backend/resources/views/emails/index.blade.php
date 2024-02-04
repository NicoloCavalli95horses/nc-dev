<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h2>From: {{ $data['from'] }}</h2>    
    <h3>Subject: {{ $data['subject'] }}</h3>    
    <p>Message: {{ $data['message'] }}</p>    
</body>
</html>