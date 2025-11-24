async function fetchMessages() {
  try {
    const res = await fetch("/api/messages");
    const messages = await res.json();

    const chat = document.getElementById("chat");
    chat.innerHTML = messages
      .map(m => `<div class="msg"><span class="name">\( {m.localplayername}:</span> \){m.message}</div>`)
      .join("");

    chat.scrollTop = chat.scrollHeight;
  } catch (e) {
    document.getElementById("chat").innerHTML = "Error loading messages...";
  }
}