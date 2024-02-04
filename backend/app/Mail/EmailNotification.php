<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailNotification extends Mailable
{
  use Queueable, SerializesModels;

  private $data = [];

  public function __construct($data)
  {
    $this->data = $data;
  }

  public function build()
  {
    return $this
      ->to('nicolo.cavalli95@gmail.com')
      ->from( $this->data['from'], $this->data['from'] )
      ->subject( $this->data['subject'] )
      ->view('emails.index')
      ->with('data', $this->data);
  }
}
