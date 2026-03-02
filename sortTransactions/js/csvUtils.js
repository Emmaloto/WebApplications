// Utility functions for CSV parsing, file loading, and downloading results
function parseCSV(text) {
  return text
    .trim()
    .split(/\r?\n/)
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

function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function getDateTimeString() {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, "-");
}