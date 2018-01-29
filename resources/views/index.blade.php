<!DOCTYPE HTML>
<html lang="en">

  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Sticker Migrater">

    <title>Sticker Migrater</title>

    <meta name="csrf-token" content="{{ csrf_token() }}" id="csrf-token">
    <meta name="msapplication-config" content="/browserconfig.xml">
    <meta name="theme-color" content="#E67E22">
    <link rel="stylesheet" href="{{ mix('style.css', '/packs') }}" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="mask-icon" href="/mask-icon.svg" color="#E67E22">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
    <link rel="manifest" href="/manifest.json">

    {{--  Prefetch  --}}
    <link as="script" crossorigin="anonymous" href="{{ mix('/features/home.js', '/packs') }}" rel="preload">
  </head>

  <body class="" role="application">
    <div id="root" data-props='{}'></div>
    <script src="{{ mix('/main.js', '/packs') }}"></script>
  </body>

</html>
