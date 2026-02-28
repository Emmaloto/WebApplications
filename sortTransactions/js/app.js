// Helper functions to parse and generate CSV
function parseCSV(text) {
  return text
    .trim()
    .split("\n")
    .map(row => row.split(","));
}

function toCSV(rows) {
  return rows.map(row => row.join(",")).join("\n");
}

function loadFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// Main processing function
async function processFiles() {
  const mappingFile = document.getElementById("mappingFile").files[0];
  const transactionsFile = document.getElementById("transactionsFile").files[0];
  const columnNumber = parseInt(document.getElementById("columnNumber").value);
  const hasHeaders = document.getElementById("hasHeaders").checked;

  if (!mappingFile || !transactionsFile || !columnNumber) {
    alert("Please provide all inputs.");
    return;
  }

  const mappingText = await loadFile(mappingFile);
  const transactionsText = await loadFile(transactionsFile);

  const mappingRows = parseCSV(mappingText);
  const transactionRows = parseCSV(transactionsText);

  const nameIndex = columnNumber - 1;

  // Display progress bar
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = "0%";

  // Build keyword → category list
  const mappings = [];
  for (let i = 1; i < mappingRows.length; i++) {
    const category = mappingRows[i][0].trim();
    const keyword = mappingRows[i][1].trim().toLowerCase();
    mappings.push({ category, keyword });

    const progress = (i / mappingRows.length) * 100;
    progressBar.style.width = progress + "%";    
  }

  // Add Category header
  // Needs to check if the transactions file has headers or not, and adjust accordingly
  if (hasHeaders) {
    transactionRows[0].push("Category");
  } else {
    transactionRows.unshift([]);
  }

//   transactionRows[0].push("Category");
  

  // Classify rows
  for (let i = 1; i < transactionRows.length; i++) {
    const row = transactionRows[i];
    let category = "";

    // Check if the specified column index is within bounds for this row
    if (nameIndex < row.length) {
      const description = row[nameIndex].toLowerCase();

      for (let mapping of mappings) {
        if (description.includes(mapping.keyword)) {
          category = mapping.category;
          break;
        }
      }
    }

    row.push(category);
  }

  const outputCSV = toCSV(transactionRows);
  downloadCSV(outputCSV, "classified_transactions.csv");

  // Display information about the uploaded files and classified transactions
  const fileSize = transactionsFile.size;
  const rows = transactionRows.length;
  const classifiedRows = transactionRows.filter(row => row[nameIndex + 1] !== "").length;
  const categoryCounts = transactionRows.reduce((counts, row) => {
    const category = row[nameIndex + 1];
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});
  const info = document.getElementById("info");
  info.innerHTML = `<p>File size: ${fileSize} bytes</p>
                    <p>Number of rows: ${rows}</p>
                    <p>Number of classified rows: ${classifiedRows}</p>
                    <p>Category counts: ${JSON.stringify(categoryCounts)}</p>`;  


}

function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}