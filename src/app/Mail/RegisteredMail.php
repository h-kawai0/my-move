<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

// Mailableクラスを利用してメールを送信
class RegisteredMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * ユーザーインスタンス
     */

    public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        //
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */

     // 「会員登録完了のお知らせ」をユーザーにメール送信するため
     // registeredのbladeファイルを読み込む。
    public function build()
    {
        return $this->subject('会員登録完了のお知らせ')->view('emails.registered');
    }
}
