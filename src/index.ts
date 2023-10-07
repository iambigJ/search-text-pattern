
import {dictionary} from "./Dictionary";

function find3words(text: string): string[] {
  // Extract words using regular expression and convert to lowercase
  const words: string[] = text.toLowerCase().match(/[a-z']+/g) || [];

  // Count word occurrences using an object
  const wordCounts: { [key: string]: number } = {};
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });

  // Sort words by occurrence in descending order
  const sortedWords: string[] = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);

  // Return the top 3 words or fewer if there are fewer than 3 unique words
  return sortedWords.slice(0, 3);
}

console.log( find3words( dictionary.text1))
console.log( find3words( dictionary.text2))
console.log( find3words( dictionary.text3))



