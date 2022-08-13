function detectDevice(props) {
  const userArgent = navigator.userAgent;
  if (userArgent.indexOf("Firefox") > -1) {
    props("Mozilla Firefox");
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
  } else if (userArgent.indexOf("SamsungBrowser") > -1) {
    props("Samsung Internet");
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
  } else if (
    userArgent.indexOf("Opera") > -1 ||
    userArgent.indexOf("OPR") > -1
  ) {
    props("Opera");
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
  } else if (userArgent.indexOf("Trident") > -1) {
    props("Microsoft Internet Explorer");
    // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
  } else if (userArgent.indexOf("Edge") > -1) {
    props("Microsoft Edge (Legacy)");
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
  } else if (userArgent.indexOf("Edg") > -1) {
    props("Microsoft Edge (Chromium)");
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64
  } else if (userArgent.indexOf("Chrome") > -1) {
    props("Google Chrome or Chromium");
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
  } else if (userArgent.indexOf("Safari") > -1) {
    props("Apple Safari");
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
  } else {
    props("unknown");
  }
}

export default detectDevice;
