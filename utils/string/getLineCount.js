/**
 * Returns the number of lines in a text string.
 *
 * @param {string} text
 * @returns {number}
 */
function Index(text) {
  if (!text) return 0;
  return text.split(/\r\n|\r|\n/).length;
}

export default Index;