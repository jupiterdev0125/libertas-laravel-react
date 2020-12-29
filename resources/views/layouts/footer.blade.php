
<div class="footer sm-text-center">
    <div class="container p-bot-2 p-top-2">
        <div class="row">
            <div class="col-12 col-md-6">
                <h1>Libertas LLC</h1>
                <span>Not officially associated with Discord</span>
                <br>
                <a href="https://www.instagram.com/libertasbot/" target="_blank">
                    <i class="fab fa-instagram-square"></i>
                </a>
                <a href="https://twitter.com/LibertasBot" target="_blank">
                    <i class="fab fa-twitter-square"></i>
                </a>
                <a href="https://www.linkedin.com/company/libertas-bot-llc" target="_blank">
                    <i class="fab fa-linkedin"></i>
                </a>
            </div>
            <div class="col-12 col-md-6 mob-m-top-2">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <h2>Product</h2>
                        <a href="{{ url('/') }}">Home</a><br>
                        @if (session()->has('user'))
                            <a href="{{ url('dashboard') }}">Dashboard</a><br>
                        @endif
                        <a href="{{ url('support') }}" target="_blank">Support</a><br>
                    </div>
                    <div class="col-12 col-md-6 mob-m-top-2">
                        <h2>Policies</h2>
                        <a href="{{ url('policies') }}">Privacy Policy</a><br>
                        <a href="{{ url('policies') }}">Terms of Service</a><br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
