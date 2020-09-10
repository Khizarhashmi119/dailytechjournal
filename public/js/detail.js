const deleteBtn = document.querySelector("#delete-btn");
const updateBtn = document.querySelector("#update-btn");

deleteBtn.addEventListener("click", async () => {
  const endPoint = `/blogs/delete/${deleteBtn.dataset.id}`;
  const res = await fetch(endPoint, {
    method: "DELETE",
  });
  const data = await res.json();
  window.location.href = data.redirect;
});

updateBtn.addEventListener("click", () => {
  const endPoint = `/blogs/update/${updateBtn.dataset.id}`;
  window.location.href = endPoint;
});
