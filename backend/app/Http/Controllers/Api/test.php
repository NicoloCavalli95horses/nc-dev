<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TestController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
      return 'ciao';
  }

}