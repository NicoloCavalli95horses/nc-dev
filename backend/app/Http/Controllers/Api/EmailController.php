<?php

//==============================
// Import
//==============================
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;
use App\Mail\EmailNotification;
use App\Services\EmailService;


//==============================
// Class
//==============================
class EmailController extends Controller
{
  protected EmailService $emailService;
  public function __construct(EmailService $emailService)
  {
    $this->emailService = $emailService;
  }


  public function store(Request $request)
  {
    $response = $this->emailService->sendEmail($request);
    return response()->json($response, $response['code']);
  }
}
