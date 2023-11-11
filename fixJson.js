const fs = require('fs').promises;

function fixJson(inputFile, outputFile) {
  // Read the JSON file
  fs.readFile(inputFile, 'utf8')
    .then((data) => {
      // Replace single quotes with &srquo;
      const modifiedData = data.replace(/'/g, '&srquo;');

      // Write the modified data back to the file
      return fs.writeFile(outputFile, modifiedData, 'utf8');
    })
    .then(() => {
      console.log('Single quotes replaced successfully!');
    })
    .catch((err) => {
      console.error('Error:', err);
    });
}

// Replace 'products.json' and 'productsModified.json' with your actual file names
fixJson('products.json', 'productsModified.json');
