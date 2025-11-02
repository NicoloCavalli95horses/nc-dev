<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Email</title>
</head>

<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333;">

    <div class="email-container"
        style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">

        <p style="font-size: 16px;">Hey, someone emailed you from your website</p>

        <section
            style="padding: 10px; border-radius: 4px; margin: 0 0 10px 0;">
            <p style="text-transform: uppercase; font-weight: 800; font-size: 14px;">From</p>
            <h2 style="margin: 0; font-size: 24px;">{{ $data['from'] }}</h2>
        </section>

        <section
            style="background-color: #007bff; color: #ffffff; padding: 10px; border-radius: 4px; margin: 0 0 10px 0;">
            <p style="text-transform: uppercase; font-weight: 800; font-size: 14px;">Subject</p>
            <h2 style="margin: 0; font-size: 24px;">{{ $data['subject'] }}</h2>
        </section>

        <section
            style="background-color: #007bff; color: #ffffff; padding: 10px; border-radius: 4px; margin: 0 0 10px 0;">
            <p style="text-transform: uppercase; font-weight: 800; font-size: 14px;">Message</p>
            <h2 style="margin: 0; font-size: 24px;">{{ $data['message'] }}</h2>
        </section>

        <footer style="text-align: center; font-size: 12px; margin-top: 40px; color: #777777;">
            <p>Email generated automatically from <a href="https://nicolocavalli.com/"
                    style="color: #007bff;">https://nicolocavalli.com/</a></p>
        </footer>
    </div>

</body>

</html>
