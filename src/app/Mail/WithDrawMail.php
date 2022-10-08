<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

// Mailableクラスを利用して退会完了メールを送信
class WithDrawMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * ユーザーインスタンス
     * 
     * @return User 
     */

     public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */

     // 「退会完了のお知らせ」をユーザーへメール送信するため
     // withdrawのbladeファイルを読み込む。

    public function build()
    {
        return $this->subject('退会完了のお知らせ')->view('emails.withDraw');
    }
}
