let Navbar = document.getElementById("navbar");

let html = `
<nav class="navbar navbar-expand-lg navbar-light">
<a class="navbar-brand" href="./index.html">
<img src="./images/WebRacerLogo.png" width="50" height="auto" class="d-inline-block align-middle" alt="">
WebRacer
</a>
<button
	class="navbar-toggler"
	type="button"
	data-toggle="collapse"
	data-target="#navbarSupportedContent"
	aria-controls="navbarSupportedContent"
	aria-expanded="false"
	aria-label="Toggle navigation"
>
	<span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
	<ul class="navbar-nav ml-auto">
		<li class="nav-item" style = "margin-left: 2em;">
			<a class="nav-link" href="./contact-us.html">Contact Us</a>
		</li>
		<li class="nav-item" style = "margin-left: 2em;">
			<a class="nav-link" href="./sign-up.html">Sign Up</a>
		</li>
		<li class="nav-item" style = "margin-left: 2em;">
			<a class="nav-link" href="./log-in.html">Sign in</a>
		</li>
	</ul>
</div>
</nav>`;

Navbar.innerHTML=html;
//adding css to the navbar
Navbar.style.cssText = 'background-color: #ff4c29; position: absolute; top: 0; right: 0; left: 0; z-index: 10;';