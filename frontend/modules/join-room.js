document.getElementById("enter").addEventListener("click", function () {
	console.log(document.getElementById("join-code").value);
	console.log(document.getElementById("join-name").value);
});


const joinroom = async () => {
	const roomcode = document.getElementById("join-code").value;
	if (!roomcode) return;
	const responseJSON = await httpReq("/api/room", "POST", {
		id: roomcode
	});
	const response = JSON.parse(responseJSON);
	if (response.success) {
		// document.cookie(
		alert("entered room");
	} else {
		alert("failed")
		alert(JSON.stringify(response.errors));
	}
}