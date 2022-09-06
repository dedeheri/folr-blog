function trancute(text, number) {
  return text.length > number ? text.substring(0, number) + "..." : text;
}

export default trancute;
