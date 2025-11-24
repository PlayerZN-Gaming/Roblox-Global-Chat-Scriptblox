async function send() {
  const name = document.getElementById("name").value.trim() || "Guest";
  const msg = document.getElementById("msg").value.trim();
  if (!msg) return;

  await fetch("/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ localplayername: name, message: msg })
  });

  document.getElementById("msg").value = "";
  fetchMessages();
}