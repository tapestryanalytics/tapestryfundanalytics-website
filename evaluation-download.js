const evaluationForm = document.querySelector("#evaluation-form");
const evaluationStatus = document.querySelector("#form-status");
const evaluationDownload = "https://github.com/tapestryanalytics/tapestryfundanalytics-website/releases/download/evaluation-v1.0.0/Tapestry.Fund.Analytics.Evaluation.exe";

evaluationForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = evaluationForm.querySelector("button[type='submit']");
  button.disabled = true;
  button.textContent = "Preparing download…";
  evaluationStatus.hidden = true;

  try {
    const response = await fetch(evaluationForm.action, {
      method: "POST",
      body: new FormData(evaluationForm),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Submission failed");
    evaluationForm.reset();
    evaluationStatus.className = "form-status success";
    evaluationStatus.innerHTML = `Thank you. Your download is beginning. If it does not start, <a href="${evaluationDownload}">download it here</a>.`;
    evaluationStatus.hidden = false;
    window.location.assign(evaluationDownload);
  } catch {
    evaluationStatus.className = "form-status error";
    evaluationStatus.innerHTML = 'We could not submit the form. Please try again or contact <a href="mailto:sales@tapestryfundanalytics.com">sales@tapestryfundanalytics.com</a>.';
    evaluationStatus.hidden = false;
    button.disabled = false;
    button.textContent = "Download Evaluation for Windows";
  }
});
