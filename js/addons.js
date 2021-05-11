window.onload = function () {

	if (window["WebSocket"]) {
		ws_connect();
		ws.onclose = function (evt) {
			document.body.innerHTML = '<div style="direction: ltr; position: fixed; top: 0; z-index: 999999; display: block; width: 100%; height: 100%; background: #33266e"><p style="position: relative; top: 40%; display: block; font-size: 32px; font-weight: bold; color: #fff; margin: 0 auto; text-align: center">To use this feature you need to enable the brunch "pwa" option.</p></div>';
		};
	} else {
		document.body.innerHTML = '<div style="direction: ltr; position: fixed; top: 0; z-index: 999999; display: block; width: 100%; height: 100%; background: #33266e"><p style="position: relative; top: 40%; display: block; font-size: 32px; font-weight: bold; color: #fff; margin: 0 auto; text-align: center">To use this feature you need to enable the brunch "pwa" option.</p></div>';
	}

	checkCookie();
	
	window.addEventListener('appinstalled', () => {
		window.location.href = "brunch.html";
	});

	refresh_data = function() {
		document.getElementById("log").innerHTML = log;
	};

	document.getElementById("form4").onsubmit = function () {
		document.getElementById("log").style.background = "gray";
		log = "<br><center><b>Console log:</b></center><br>";
		document.getElementById("log").innerHTML = log;
		if (!ws) {
			return false;
		}
		ws.send("install-toolchain");
		return false;
	};

	document.getElementById("form5").onsubmit = function () {
		document.getElementById("log").style.background = "gray";
		log = "<br><center><b>Console log:</b></center><br>";
		document.getElementById("log").innerHTML = log;
		if (!ws) {
			return false;
		}
		ws.send("install-toolkit");
		return false;
	};
};
