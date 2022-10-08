<p>
  {{ $user->name }}様<br />
  <br/>
  {{ config('app.name')}}をご利用いただきありがとうございます。<br/>
  <br />
  {{ $user->name}}様の退会が完了されましたので、お知らせ致します。<br/>
  <br/>
  またのご利用をお待ちしております。<br/>
  なお、本メールは送信専用です。本メールに返信されてもご対応は致しかねます。<br/>
  <br/>

  @include('templates.signature')
  
</p>