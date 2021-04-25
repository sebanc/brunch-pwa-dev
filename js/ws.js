var ws;
var log = "";

function refresh_data() {
  console.log("Data refresh requested without display");
}

function ws_connect() {
		ws = new WebSocket("ws://localhost:8080");
		ws.onclose = function (evt) {
			console.log("Connection closed");
		};
		ws.onmessage = function (evt) {
			var messages = evt.data.split(':');
      log = "";
			for (var i = 0; i < messages.length; i++) {
        console.log("Message received: " + messages[i]);
				if (messages[0] === "brunch-version") {
          setCookie("brunch-version", messages[1]);
          break;
        }
				if (messages[0] === "latest-stable") {
          setCookie("latest-stable", messages[1]);
          break;
        }
				if (messages[0] === "latest-unstable") {
          setCookie("latest-unstable", messages[1]);
          break;
        }
        if (messages[0] === "chromeos-version") {
          setCookie("chromeos-version", messages[1]);
          break;
        }
				if (messages[0] === "latest-chromeos") {
          setCookie("latest-chromeos", messages[1]);
          break;
        }
				log += "<b>" + messages[i] + "<b><br>";
			}
      refresh_data();
		};
}
  
