// Utility functions to display file info and classification summary
function showUploadedFileInfo(elementId, file, rowCount) {
  const el = document.getElementById(elementId);
  el.classList.remove("is-hidden");

  el.innerHTML = `
    <strong>File Name:</strong> ${file.name}<br>
    <strong>File Size:</strong> ${(file.size / 1024).toFixed(2)} KB<br>
    <strong>Row Count:</strong> ${rowCount}
  `;
}

function showClassificationSummary(summary) {
  const el = document.getElementById("classificationSummary");
  el.classList.remove("is-hidden");

  let categoriesHTML = "";
  for (let cat in summary.categoryCounts) {
    categoriesHTML += `<li>${cat}: ${summary.categoryCounts[cat]}</li>`;
  }

  el.innerHTML = `
    <strong>Total Transactions:</strong> ${summary.total}<br>
    <strong>Classified:</strong> ${summary.classified}
    <hr>
    <strong>Category Breakdown:</strong>
    <ul>${categoriesHTML}</ul>
  `;
}