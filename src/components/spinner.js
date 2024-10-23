function renderSpinner() {
  return `
<div class="overlay" style="display: none;">
    <div class="d-flex justify-content-center align-items-center h-100">
        <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</div>`;
}
