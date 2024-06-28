export function getCookies() {
  let cookies_string = document.cookie
  const cookies = {};
  cookies_string = cookies_string.split('; ');
  for (let i in cookies_string) {
      const cur = cookies_string[i].split('=');
      cookies[cur[0]] = cur[1];
  }
  return cookies
}