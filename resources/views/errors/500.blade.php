@extends('layouts.main')

@section('content')
    <div class="text-center col-12">
        <p>Oops, something went wrong!</p>
        <a href="/support" class="btn btn-enabled">Support</a>
        <a id="link-back" class="btn btn-disabled">Back</a>
    </div>
    <script>
        document.getElementById('link-back').addEventListener('click', () => window.history.back());
    </script>
@endsection