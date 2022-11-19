<p>
  {{ $user->name }}様<br />
  <br />
  {{ config('app.name')}}にご登録いただき、ありがとうございます。<br />
  会員登録が完了致しましたのでお知らせ致します。<br />
  <br />
  なお、本メールは送信専用です。本メールにご返信されてもご対応は致しかねます。<br />
  <br />

  @include('templates.signature')
</p>