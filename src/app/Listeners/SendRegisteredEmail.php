<?php

namespace App\Listeners;

use App\Mail\RegisteredMail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendRegisteredEmail
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */

     // Registeredイベントが発行されたとき、登録完了メールが送信されるようにする
    public function handle(Registered $event)
    {
        $user = $event->user;

        Mail::to($user)->send(new RegisteredMail($user));
    }
}
