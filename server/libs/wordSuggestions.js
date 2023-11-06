const wordSuggestions = (
  extractedWord,
  keywords,
  levenshteinDistance
) => {
  const suggestions = [];
  const lowerCaseWord = extractedWord.toLowerCase();

  for (const keyword of keywords) {
    const distance = levenshteinDistance(lowerCaseWord, keyword);

    if (distance <= 2) {
      suggestions.push(keyword);
    }
  }

  return suggestions;
};

module.exports = { wordSuggestions };