const LIMITS = {
  TWITTER: 280,
  FACEBOOK: 2200,
};

const elements = {
  textarea: document.querySelector(".textarea"),
  stats: {
    characters: document.querySelector(".stat__number--characters"),
    twitter: document.querySelector(".stat__number--twitter"),
    facebook: document.querySelector(".stat__number--facebook"),
    words: document.querySelector(".stat__number--words"),
  },
};

const validateInput = (text) => {
  if (text.includes("<script>")) {
    alert("You cannot include <script> in your text");
    return text.replace("<script>", "");
  }
  return text;
};

const calculateStats = (text) => ({
  characters: text.length,
  twitter: LIMITS.TWITTER - text.length,
  facebook: LIMITS.FACEBOOK - text.length,
  words: text.trim() ? text.trim().split(/\s+/).length : 0,
});

const updateVisualIndicator = (element, isExceeded) => {
  element.classList.toggle("stat__number--limit", isExceeded);
};

const updateStats = (stats) => {
  elements.stats.characters.textContent = stats.characters;
  elements.stats.twitter.textContent = stats.twitter;
  elements.stats.facebook.textContent = stats.facebook;
  elements.stats.words.textContent = stats.words;

  updateVisualIndicator(elements.stats.twitter, stats.twitter < 0);
  updateVisualIndicator(elements.stats.facebook, stats.facebook < 0);
};

const inputHandler = () => {
  const validatedText = validateInput(elements.textarea.value);
  elements.textarea.value = validatedText;
  const stats = calculateStats(validatedText);
  updateStats(stats);
};

elements.textarea.addEventListener("input", inputHandler);
