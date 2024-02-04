<?php

//==============================
// Import
//==============================
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;


//==============================
// Class
//==============================
class TestController extends Controller
{
  public function index()
  {
    $test = array("test"=> true);
    return json_encode($test);
  }
}
