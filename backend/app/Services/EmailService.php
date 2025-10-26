<?php

//==============================
// Import
//==============================
namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Mail\EmailNotification;


//==============================
// Class
//==============================
class EmailService
{
    public function sendEmail(Request $request): array
    {
        $validator = Validator::make($request->all(), [
            'from' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return [
                'status' => 'FAIL',
                'code' => 422,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ];
        }

        try {
            Mail::send(new EmailNotification($validator->validated()));

            return [
                'status' => 'OK',
                'code' => 200,
                'message' => 'Email sent successfully',
                'data' => $validator->validated(),
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'FAIL',
                'code' => 500,
                'message' => 'Failed to send email',
                'error' => $e->getMessage(),
            ];
        }
    }
}
