========================<br />
{{ config('app.name')}}運営事務局<br />

@if(app('env') === 'local')
URL: <a href="{{ url('') }}">{{ url('') }}</a><br />
@elseif(app('env') === 'production')
URL: <a href="{{ url('', null, true) }}">{{ url('', null, true)}}</a><br />
@endif

Email:<a href="mailto:{{ config('mail.from.address') }}">{{ config('mail.from.address') }}</a><br />
========================