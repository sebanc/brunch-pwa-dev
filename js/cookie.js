function setCookie(name,value) {
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (10*365*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function checkCookie() {
  var brunch_stable=getCookie("brunch_stable");
  var brunch_unstable=getCookie("brunch_unstable");
  if (brunch_stable == null) {
    setCookie("brunch_stable", "yes");
  }
  if (brunch_unstable == null) {
    setCookie("brunch_unstable", "no");
  }
}