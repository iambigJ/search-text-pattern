import fs from 'fs';
import readline from 'readline';

//this solution in more advance but not readable as the first one
async function getTop3Words(filePath: string): Promise<string[]> {
  const wordCounts = new Map<string, number>();

  // Create a read stream and read line by line
  const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Regular expression to extract words
  const wordRegex = /[a-z']+/gi;

  for await (const line of rl) {
    let match;
    while ((match = wordRegex.exec(line)) !== null) {
      const word = match[0].toLowerCase();
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    }
  }

  // Convert the map to an array and sort by frequency
  const sortedWords = Array.from(wordCounts.entries())
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .slice(0, 3) // Get top 3 words
    .map(entry => entry[0]); // Extract the words

  return sortedWords;
}

async function main() {
  try {
    const top3Words = await getTop3Words('./Dictionary');
    console.log('Top 3 words:', top3Words);
    // You can return or use the top3Words as needed
  } catch (error) {
    console.error('Error processing file:', error);
  }
}

main();
