<p>
  {{ $user }}様<br />
  <br />
  {{ config('app.name')}}をご利用いただきありがとうございます。<br />
  <br />
  {{ $user }}様のログインパスワードが変更されましたので、お知らせいたします。
  &#40;パスワードの内容は、本メールに記載しておりません。&#41;<br />
  なお、本メールは送信専用です。本メールにご返信されてもご対応は致しかねます。<br />
  <br />

  @include('templates.signature')
</p>