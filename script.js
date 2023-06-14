var email = Session.getEffectiveUser().getEmail()

function merge_Arrays(left_sub_array, right_sub_array) {
  /**
   * Takes two sorted arrays and merges them to a larger sorted array
   * 
   * @param {array} left_sub_array - The first array to merge
   * @param {array} right_sub_array - The second array to merge
   * 
   * @returns {array} - The combined array
   */
  let array = []
  while (left_sub_array.length && right_sub_array.length) {
    // Add the next smallest element into the sorted array
    if (left_sub_array[0][1] > right_sub_array[0][1]) {
      array.push(left_sub_array.shift())
    } else {
      array.push(right_sub_array.shift())
    }
  }
  // Append any left over elements onto the end of the array
  return [ ...array, ...left_sub_array, ...right_sub_array ]
}

function merge_sort(unsorted_Array) {
  /**
   * Uses merge sort to recursively sort the unordered array
   * 
   * @param {array} unsorted_array - The array to sort
   * 
   * @returns {array} - The sorted array
   */
  const middle_index = unsorted_Array.length / 2;
  if(unsorted_Array.length < 2) {
    return unsorted_Array;
  }
  // Split the array and sort recursively
  const left_sub_array = unsorted_Array.splice(0, middle_index);
  return merge_Arrays(merge_sort(left_sub_array),merge_sort(unsorted_Array));
}

function truncateWord(word){
  /**
   * Removes punctuation from strings for matching purposes
   * 
   * @param {string} word - The string to truncate
   * 
   * @returns {string} - The truncated string
   */
  var punctuation = /[\.,?!"()]/g;
  var newText = word.replace(punctuation, "");
  return newText;
}

function sortWords(words, counts){
  /**
   * Uses merge sort to sort the words based on number of occurances
   * 
   * @param {array} words - List of words
   * @param {array} counts - List of number of occurances of each word
   * 
   * @returns {array} - The sorted and combined array
   */
  // Combine the arrays so that they are paired for sorting
  var combined = [];
  for (var i=0; i < counts.length; i++){
    combined.push([words[i], counts[i]]);
  }

  return merge_sort(combined);
}

function filterWords(words, minLen){
  /**
   * Filters out the words which do not meet the length requirement
   * 
   * @param {array} words - List of words
   * @param {int} minLen - Minimum required length of word
   * 
   * @returns {array} - The filtered array
   */
  newList = [];
  for (var i=0; i < words.length; i++){
    // Filter out words that are too short
    if (words[i][0].length >= minLen){
      newList.push(words[i]);
    }
  }
  return newList;
}

function mainFunction(size = 5) {
  /**
   * Goes through documents and tracks the occurrences of each word
   * 
   * @param {int} size - The number of documents which are searched
   * 
   * @returns {array} - A list of words ordered by commoness
   */
  var docs = DriveApp.getFilesByType("application/vnd.google-apps.document");
  var wordTrack = [];
  var countTrack = [];
  var counter = 0;
  var usedDocs = [];

  // Loop through files
  while (docs.hasNext() && counter < size){
    var file = docs.next();
    var owner = file.getOwner();

    // Check if the document was made by the user
    if (owner){
      if (owner.getEmail() == email){
        // Read the contents of the file
        var docfile = DocumentApp.openById(file.getId());
        var words = docfile.getBody().getText().split(" ");
        usedDocs.push([docfile.getName(), words.length]);
        
        // Record each word in the document
        for (var i = 0; i < words.length; i++){
          var newWord = truncateWord(words[i]).toLowerCase();

          // Check if word is already recorded
          if (wordTrack.includes(newWord)){
            countTrack[wordTrack.indexOf(newWord)] += 1;
          } else {
            wordTrack.push(newWord);
            countTrack.push(1);
          }
        }
        counter++;
      }
    }
  }
  // Sort the lists and return them
  return [sortWords(wordTrack, countTrack), merge_sort(usedDocs)];
};

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
};

function getResultFromWebApp(numWords, numDocs, minLen = 1){
 
  // Fetch the list of words  
  let final = mainFunction(numDocs);
  // Filter words based on their length
  let trimmed = filterWords(final[0], minLen)
  // Return the number of words asked for by the user
  return [trimmed.slice(0, numWords), final[1]];
};
