window.onload = function () {
checkCookie();
alert(document.cookie);

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
    
document.getElementById('notify_stable').addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    setCookie("brunch_stable","yes");
  } else {
    setCookie("brunch_stable","no");
    eraseCookie("latest_stable_brunch")
  }
})

document.getElementById('notify_unstable').addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    setCookie("brunch_unstable","yes");
  } else {
    setCookie("brunch_unstable","no");
    eraseCookie("latest_unstable_brunch")
  }
})

};
