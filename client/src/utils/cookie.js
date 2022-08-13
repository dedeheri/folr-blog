export function getAllCookies() {
  const cookie = document.cookie.split(" ");
  let cookies = {};
  for (let i = 0; i < cookie.length; i++) {
    let pair = cookie[i].split("=");
    cookies[(pair[0] + "").trim()] = pair
      .slice(1)
      .join("=")
      .replaceAll(";", "");
  }
  return cookies;
}
