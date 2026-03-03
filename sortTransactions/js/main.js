const mappingInput = document.getElementById("mappingFile");
const transactionInput = document.getElementById("transactionFile");
const classifyBtn = document.getElementById("classifyBtn");

// Show file info when a file is uploaded
mappingInput.addEventListener("change", async () => {
  const file = mappingInput.files[0];
  if (!file) return;

  const text = await loadFile(file);
  const rows = parseCSV(text);
  showUploadedFileInfo("mappingInfo", file, rows.length);
});

transactionInput.addEventListener("change", async () => {
  const file = transactionInput.files[0];
  if (!file) return;

  const text = await loadFile(file);
  const rows = parseCSV(text);
  showUploadedFileInfo("transactionInfo", file, rows.length);

  document.getElementById("optionsPanel").classList.remove("is-hidden");
});

// Classify transactions when button is clicked
classifyBtn.addEventListener("click", async () => {
  const mappingFile = mappingInput.files[0];
  const transactionFile = transactionInput.files[0];

  if (!mappingFile || !transactionFile) {
    alert("Please upload both CSV files.");
    return;
  }
  const columnNumber = parseInt(document.getElementById("columnNumber").value) || 2;
  const hasHeaders = document.getElementById("hasHeaders").checked;

  // Show progress bar and disable button
  const progressBar = document.getElementById("progressBar");
  progressBar.classList.remove("is-hidden", "is-success");
  progressBar.classList.add("is-primary");
  progressBar.removeAttribute("value");
  classifyBtn.classList.add("is-loading");
  classifyBtn.disabled = true;

  const summary = await classifyTransactions(
    mappingFile,
    transactionFile,
    columnNumber,
    hasHeaders
  );

  showClassificationSummary(summary);

  // Update progress bar to complete and enable button
  progressBar.value = 100;
  progressBar.classList.remove("is-primary");
  progressBar.classList.add("is-success");
  classifyBtn.classList.remove("is-loading");
  classifyBtn.disabled = false;
});