window.onload = function () {
	var conn;
	var latest_stable;
	var log = document.getElementById("log");
	
	async function registerVersionCheck() {
	    const registration = await navigator.serviceWorker.ready;
            try {
                await registration.periodicSync.register('get-latest-version', { minInterval: 60 * 60 * 1000, });
            } catch {
                console.log('Periodic Sync could not be registered!');
            }
	}
	
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/brunch-pwa/sw.js', {scope: '/brunch-pwa/'}).then(function(reg) {
			console.log('Registration succeeded. Scope is ' + reg.scope);
			registerVersionCheck();
		}).catch(function(error) {
			console.log('Registration failed with ' + error);
		});
	};

    self.addEventListener('periodicsync', event => {
      if (event.tag == 'get-latest-version') {
            event.waitUntil(conn.send("latest-stable\nlatest-unstable"));
      }
    });
    
    async function showNotification(notification_text) {
        const result = await Notification.requestPermission();
        if (result === 'granted') {
            const noti = new Notification('Brunch PWA', {
                body: notification_text,
                icon: '../images/icons/512.png'
            });
            //noti.onclick = () => alert('clicked');
        }
    }
    showNotification("You will be notified of new brunch and chromeos versions.");

	document.getElementById("form").onsubmit = function () {
		document.getElementById("log").style.background = "gray";
		log.innerHTML = "<br>Console log:<br>";
		if (!conn) {
			return false;
		}
		conn.send("update-stable");
		return false;
	};

	document.getElementById("form2").onsubmit = function () {
		document.getElementById("log").style.background = "gray";
		log.innerHTML = "<br>Console log:<br>";
		if (!conn) {
			return false;
		}
		conn.send("update-unstable");
		return false;
	};

	if (window["WebSocket"]) {
		conn = new WebSocket("ws://localhost:8080");
		conn.onclose = function (evt) {
			document.body.innerHTML = '<div style="direction: ltr; position: fixed; top: 0; z-index: 999999; display: block; width: 100%; height: 100%; background: #33266e"><p style="position: relative; top: 40%; display: block; font-size: 32px; font-weight: bold; color: #fff; margin: 0 auto; text-align: center">To use this feature you need to enable the brunch "pwa" option.</p></div>';
		};
		conn.onmessage = function (evt) {
			var messages = evt.data.split(':');
			for (var i = 0; i < messages.length; i++) {
				if (messages[0] === "brunch-version") {
                    document.getElementById("brunch-version").innerHTML = "<b>Installed Brunch:</b><br>"+messages[1];
                    break;
                }
				if (messages[0] === "latest-stable") {
                    if (messages[1] === "") {
                        break;
                    }
                    if (getCookie("brunch_stable") === "yes") {
                        if (getCookie("latest_stable_brunch") != "" && getCookie("latest_stable_brunch") != messages[1]) {
                            showNotification("New stable brunch version available: " + messages[1]);
                        }
                        setCookie("latest_stable_brunch", messages[1]);
                    }
                    document.getElementById("latest-stable").innerHTML = "<b>Stable Brunch:</b><br>"+messages[1];
                    break;
                }
				if (messages[0] === "latest-unstable") {
                    if (messages[1] === "") {
                        break;
                    }
                    if (getCookie("brunch_unstable") === "yes") {
                        if (getCookie("latest_unstable_brunch") != "" && getCookie("latest_unstable_brunch") != messages[1]) {
                            showNotification("New unstable brunch version available: " + messages[1]);
                        }
                        setCookie("latest_unstable_brunch", messages[1]);
                    }
                    document.getElementById("latest-unstable").innerHTML = "<b>Unstable Brunch:</b><br>"+messages[1];
                    break;
                }
				log.innerHTML += "<b>" + messages[i] + "<b><br>";
			}
		};
	} else {
		document.body.innerHTML = '<div style="direction: ltr; position: fixed; top: 0; z-index: 999999; display: block; width: 100%; height: 100%; background: #33266e"><p style="position: relative; top: 40%; display: block; font-size: 32px; font-weight: bold; color: #fff; margin: 0 auto; text-align: center">To use this feature you need to enable the brunch "pwa" option.</p></div>';
	}

	setTimeout(() => { conn.send("brunch-version\nlatest-stable\nlatest-unstable"); }, 2000);
};
