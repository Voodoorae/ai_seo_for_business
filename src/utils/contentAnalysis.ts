export interface AnalysisResult {
  score: number;
  dataDensityScore: number;
  authorityScore: number;
  readabilityScore: number;
  issues: string[];
  strengths: string[];
}

export function analyzeContent(content: string): AnalysisResult {
  const dataDensityScore = calculateDataDensity(content);
  const authorityScore = calculateAuthoritySignals(content);
  const readabilityScore = calculateReadability(content);

  const totalScore = Math.round(
    dataDensityScore * 0.4 +
    authorityScore * 0.3 +
    readabilityScore * 0.3
  );

  const issues: string[] = [];
  const strengths: string[] = [];

  if (dataDensityScore < 50) {
    issues.push('Add more concrete data, statistics, and numbers');
  } else {
    strengths.push('Good use of data and statistics');
  }

  if (authorityScore < 50) {
    issues.push('Include authority signals like "According to", "Study shows", or "Research indicates"');
  } else {
    strengths.push('Strong authority signals detected');
  }

  if (readabilityScore < 50) {
    issues.push('Content is too complex or too simple. Aim for grade 8-10 readability');
  } else {
    strengths.push('Readability is optimized for AI understanding');
  }

  if (content.split(/\s+/).length < 100) {
    issues.push('Content is too short. Aim for at least 300 words');
  }

  return {
    score: totalScore,
    dataDensityScore,
    authorityScore,
    readabilityScore,
    issues,
    strengths,
  };
}

function calculateDataDensity(content: string): number {
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;

  if (totalWords === 0) return 0;

  const numberPattern = /\d+([.,]\d+)?%?/g;
  const numbers = content.match(numberPattern) || [];

  const dataWords = ['percent', 'percentage', 'ratio', 'increase', 'decrease', 'growth', 'decline'];
  const dataWordCount = words.filter(w =>
    dataWords.some(dw => w.toLowerCase().includes(dw))
  ).length;

  const density = ((numbers.length + dataWordCount) / totalWords) * 100;

  return Math.min(100, density * 15);
}

function calculateAuthoritySignals(content: string): number {
  const authorityPhrases = [
    'according to',
    'study shows',
    'research indicates',
    'report',
    'survey',
    'data shows',
    'experts say',
    'analysis reveals',
    'findings suggest',
    'evidence shows',
    'published in',
    'peer-reviewed',
  ];

  let signalCount = 0;
  const lowerContent = content.toLowerCase();

  authorityPhrases.forEach(phrase => {
    const matches = lowerContent.split(phrase).length - 1;
    signalCount += matches;
  });

  const score = Math.min(100, signalCount * 25);
  return score;
}

function calculateReadability(content: string): number {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const syllables = countSyllables(content);

  if (sentences.length === 0 || words.length === 0) return 0;

  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  const fleschKincaid = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

  const idealGrade = 9;
  const gradeDifference = Math.abs(fleschKincaid - idealGrade);

  const score = Math.max(0, 100 - (gradeDifference * 10));

  return Math.min(100, score);
}

function countSyllables(text: string): number {
  const words = text.toLowerCase().split(/\s+/);
  let totalSyllables = 0;

  words.forEach(word => {
    word = word.replace(/[^a-z]/g, '');
    if (word.length === 0) return;

    const vowels = word.match(/[aeiouy]+/g);
    let syllableCount = vowels ? vowels.length : 0;

    if (word.endsWith('e')) syllableCount--;
    if (syllableCount === 0) syllableCount = 1;

    totalSyllables += syllableCount;
  });

  return totalSyllables;
}
