@extends('index')

@section('twitter_card')
  <meta property="og:title" content="{{ $stpack->name }} | Sticker Migrator">
  <meta property="og:type" content="website">
  <meta property="og:description" content="{{ $stpack->name }}">
  <meta property="og:url" content="{{ url('/stpacks/'.$stpack->id) }}">
  <meta property="og:image" content="{{ $stpack->thumbnail_url }}">
  <meta property="og:site_name" content="Sticker Migrator">

  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="{{ $stpack->name }} | Sticker Migrator">
  <meta name="twitter:text:description" content="{{ $stpack->name }}">
  <meta name="twitter:image" content="{{ $stpack->thumbnail_url }}">
@endsection
