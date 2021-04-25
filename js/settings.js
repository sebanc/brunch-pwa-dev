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
alert(document.cookie);

if (getCookie("notifications") == "yes") {
if (getCookie("brunch_stable") == "yes") {
    document.getElementById("notifications-stable").innerHTML = '<b>Brunch stable: </b><input type="checkbox" id="notify_stable" checked/>';
} else {
    document.getElementById("notifications-stable").innerHTML = '<b>Brunch stable: </b><input type="checkbox" id="notify_stable"/>';
};

if (getCookie("brunch_unstable") == "yes") {
    document.getElementById("notifications-unstable").innerHTML = '<b>Brunch unstable: </b><input type="checkbox" id="notify_unstable" checked/>';
} else {
    document.getElementById("notifications-unstable").innerHTML = '<b>Brunch unstable: </b><input type="checkbox" id="notify_unstable"/>';
};
	
if (getCookie("chromeos") == "yes") {
    document.getElementById("notifications-chromeos").innerHTML = '<b>ChromeOS recovery image: </b><input type="checkbox" id="notify_chromeos" checked/>';
} else {
    document.getElementById("notifications-chromeos").innerHTML = '<b>ChromeOS recovery image: </b><input type="checkbox" id="notify_chromeos"/>';
};
    
document.getElementById('notify_stable').addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    setCookie("brunch_stable","yes");
  } else {
    setCookie("brunch_stable","no");
  }
})

document.getElementById('notify_unstable').addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    setCookie("brunch_unstable","yes");
  } else {
    setCookie("brunch_unstable","no");
  }
})
	
document.getElementById('notify_chromeos').addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    setCookie("chromeos","yes");
  } else {
    setCookie("chromeos","no");
  }
})
}

};
