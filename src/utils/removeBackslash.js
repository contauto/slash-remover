/**
 * Removes backslashes from a string.
 * @param {string} text - The input text.
 * @returns {string} The text with backslashes removed.
 */

const removeBackslash = (text) => {
  return text.replace(/\\/g, "")
}

export default removeBackslash
