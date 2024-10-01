import fs from 'fs'


function getText(): Promise<string> {
  // Read the file as a
  return new Promise((resolve, reject) => {
    let result = ''
    const fileStream  =fs.createReadStream('./Dictionary')
    fileStream.on('data', (chunk) => {
      result += chunk
    })
    fileStream.on('end', () => {
      console.log('end of reading file')
      resolve(result)
    })
    fileStream.on('error', (err) => {
      console.log('error reading file', err);
      reject(err)
    })
  })

}

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



async function getResult(){
  getText().then((text) => {
    const last = find3words(text)
    return last
  }).catch(e => {
    console.error('error', e );
  })
}
getResult()

