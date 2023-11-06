const levenshteinDistance = (str1, str2) => {
  const n = str1.length;
  const m = str2.length;
  const dp = [];

  for (let i = 0; i <= n; i++) {
    dp[i] = new Array(m + 1).fill(0);
    dp[i][0] = i;
  }

  for (let j = 0; j <= m; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const insertion = dp[i][j - 1] + 1;
      const deletion = dp[i - 1][j] + 1;
      let substitution = dp[i - 1][j - 1];

      if (str1[i - 1] !== str2[j - 1]) {
        substitution = substitution + 1;
      }

      dp[i][j] = Math.min(insertion, deletion, substitution);
    }
  }

  return dp[n][m];
};

module.exports = { levenshteinDistance };