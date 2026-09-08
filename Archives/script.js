const root = document.querySelector(".hero");

if (root) {
  root.addEventListener("pointermove", (event) => {
    const bounds = root.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    root.style.setProperty("--tilt-x", `${x * 8}px`);
    root.style.setProperty("--tilt-y", `${y * 8}px`);
  });
}
