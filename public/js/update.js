const updateBtn = document.querySelector("#update-btn");
const title = document.querySelector("#title");
const content = document.querySelector("#content");

updateBtn.addEventListener("click", async () => {
  const endPoint = `/blogs/update/${updateBtn.dataset.id}`;
  const res = await fetch(endPoint, {
    method: "put",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: title.value,
      content: content.value,
    }),
  });

  const data = await res.json();
  window.location.href = data.redirect;
});
