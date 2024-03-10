<?php

//==============================
// Import
//==============================
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;
use App\Mail\EmailNotification;

//==============================
// Class
//==============================
class EmailController extends Controller
{
  // GET request
  public function index()
  {
    $test = array("email"=> true);
    return json_encode($test);
  }
  // POST request
  public function store(Request $request)
  {

    $from = $request->from;
    $subject = $request->subject;
    $message = $request->message;

    try {
      Mail::send( new EmailNotification($request) );

      return response()->json([
        'status' => 'OK',
        'code' => 200,
        'from' => $from,
        'subject' => $subject,
        'message' => $message,
      ], 200);
    } catch (\Exception $e) {
        return response()->json([
          'status' => 'FAIL',
          'code' => 500,
          'message' => 'failed to send email',
          'error' => $e->getMessage(),
        ], 200);
      }
    }
}
