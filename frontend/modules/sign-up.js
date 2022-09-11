const signup = async () => {
	const username = document.getElementById("usernameInput").value;
	const email = document.getElementById("emailInput").value;
	const password = document.getElementById("passwordInput").value;
	if (!username || !email || !password) return;
	const responseJSON = await httpReq("/api/user", "POST", {
		username: username,
		email: email,
		password: password
	});
	const response = JSON.parse(responseJSON);
	if (response.success) {
		// document.cookie(
		alert("signed in!");
	} else {
		alert("failed")
		alert(JSON.stringify(response.errors));
	}
}