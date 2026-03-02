// Main classification logic
async function classifyTransactions(mappingFile, transactionFile, columnNumber, hasHeaders) {
  const mappingText = await loadFile(mappingFile);
  const transactionText = await loadFile(transactionFile);

  const mappingRows = parseCSV(mappingText);
  const transactionRows = parseCSV(transactionText);

  const nameIndex = columnNumber - 1;

  const mappings = [];
  for (let i = 1; i < mappingRows.length; i++) {
    mappings.push({
      category: mappingRows[i][0],
      keyword: mappingRows[i][1].toLowerCase()
    });
  }

  if (hasHeaders) {
    transactionRows[0].push("Category");
  } else {
    transactionRows.unshift(["Category"]);
  }

  let classifiedCount = 0;
  const categoryCounts = {};

  for (let i = 1; i < transactionRows.length; i++) {
    const row = transactionRows[i];
    let category = "";

    const description = (row[nameIndex] || "").toLowerCase();

    for (let mapping of mappings) {
      if (description.includes(mapping.keyword)) {
        category = mapping.category;
        break;
      }
    }

    if (category) {
      classifiedCount++;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }

    row.push(category);
  }

  const timestamp = getDateTimeString();
  const outputFileName = `classified_transactions_${timestamp}.csv`;

  downloadCSV(toCSV(transactionRows), outputFileName);

  return {
    total: transactionRows.length - 1,
    classified: classifiedCount,
    categoryCounts
  };
}