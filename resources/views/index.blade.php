<!DOCTYPE HTML>
<html lang="en">

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Sticker Migrator">

    <title>Sticker Migrator</title>

    <meta name="csrf-token" content="{{ csrf_token() }}" id="csrf-token">
    <meta name="msapplication-config" content="/browserconfig.xml">
    <meta name="theme-color" content="#E67E22">
    <link rel="stylesheet" href="{{ mix('style.css', '/packs') }}">
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="mask-icon" href="/mask-icon.svg" color="#E67E22">
    <link rel="apple-touch-icon" href="{{ url('/apple-touch-icon.png') }}" sizes="180x180">
    <link rel="manifest" href="/manifest.json">

    @section('twitter_card')
      <meta property="og:title" content="Sticker Migrator">
      <meta property="og:type" content="website">
      <meta property="og:description" content="Sticker Migrator from LINE to Telegram">
      <meta property="og:url" content="{{ url('/') }}">
      <meta property="og:image" content="{{ url('/apple-touch-icon.png') }}">
      <meta property="og:site_name" content="Sticker Migrator">

      <meta name="twitter:card" content="summary">
      <meta name="twitter:title" content="Sticker Migrator">
      <meta name="twitter:text:description" content="Sticker Migrator from LINE to Telegram">
      <meta name="twitter:image" content="{{ url('/apple-touch-icon.png') }}">
    @show

    @yield('initial_state')

    {{--  Socket.io  --}}
    <script src="//{{ $echo_host }}/socket.io/socket.io.js"></script>
  </head>

  <body class="" role="application">
    {{--  Rendering target  --}}
    <div id="root" data-props='{}'></div>

    {{--  Main Script  --}}
    <script src="{{ mix('/main.js', '/packs') }}"></script>

    {{--  Prefetching  --}}
    <script src="{{ mix('/features/home.js', '/packs') }}"></script>
    <script src="{{ mix('/features/mobile_home.js', '/packs') }}"></script>
    <script src="{{ mix('/features/stpacks.js', '/packs') }}"></script>
  </body>

</html>
