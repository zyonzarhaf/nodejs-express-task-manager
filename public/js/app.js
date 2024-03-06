document.addEventListener("DOMContentLoaded", function () {
  const editModal = document.querySelector("#exampleModal2");
  const editButtons = document.querySelectorAll("#edit-button");

  function toLocaleDateString(string) {
    if (!string) return;

    const date = new Date(string);
    return new Date(date.getTime()).toISOString().split("T")[0];
  }

  editButtons.forEach((btn) => {
    btn.addEventListener("click", async function (e) {
      const modalBody = editModal.querySelector(".modal-body");
      const userId = e.currentTarget.dataset.userId;
      const taskId = e.currentTarget.dataset.taskId;
      const apiToken = e.currentTarget.dataset.apiToken;
      const response = await fetch(`/api/user/tasks/${taskId}`, { headers: { Authorization: apiToken }});
      const data = await response.json();
      const { task } = data;

      const {
        description,
        priority,
        due,
        project,
      } = task;

      modalBody.innerHTML = 
        `
          <form class="m-0" action="/user/${userId}/tasks/${taskId}?_method=PUT" method="POST">
            <div class="mb-3">
              <label for="description" class="form-label text-capitalize">
                description
              </label>
              <input type="text" class="form-control" name="description" id="description" value="${description}">
            </div>
            <div class="d-flex mb-3">
              <div class="mb-3 me-3">
                <label for="priority" class="form-label text-capitalize">
                  priority
                </label>
                <select class="form-select" name="priority" id="priority"> 
                  <option value="low" ${priority === "low" ? 'selected' : ''}>low</option>
                  <option value="medium" ${priority === "medium" ? 'selected' : ''}>medium</option>
                  <option value="high" ${priority === "high" ? 'selected' : ''}>high</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="due" class="form-label text-capitalize">
                  due
                </label>
                <input type="date" class="form-control" name="due" id="due" value="${toLocaleDateString(due)}"> 
              </div>
            </div>
            <div class="mb-3">
              <label for="project" class="form-label text-capitalize">
                project
              </label>
              <input type="text" class="form-control" name="project" id="project" value="${project}"> 
            </div>
            <div class="modal-footer border-0">
              <button type="submit" class="btn btn-outline-dark text-capitalize">
                update
              </button>
              <button type="button" class="btn btn-outline-danger text-capitalize" data-bs-dismiss="modal">
                close
              </button>
            </div>
          </form>
        `
    });
  });
});
