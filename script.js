const API_URL = "https://script.google.com/macros/s/AKfycbzXVEG6mib3SAcxesu3ibSWxgHjFg4YSUP69CZ6268FNRwHJ6mhBYc9ryS3mqbWTN6Xew/exec
const sets = [
  {
    name: "Spring Set",
    items: [
      { text: "📖 Bookmark ×1", icon: "images/bookmark.png" },
      { text: "💌 Postcard ×2", icon: "images/postcard.png" },
      { text: "🎟 Ticket ×1", icon: "images/ticket.png" }
    ],
    quote: "A new beginning.",
    class: "spring"
  },
  {
    name: "Autumn Set",
    items: [
      { text: "📖 Bookmark ×2", icon: "images/bookmark.png" },
      { text: "💌 Postcard ×1", icon: "images/postcard.png" },
      { text: "🎟 Ticket ×1", icon: "images/ticket.png" }
    ],
    quote: "Every memory leaves a warm color behind.",
    class: "autumn"
  },
  {
    name: "Winter Set",
    items: [
      { text: "📖 Bookmark ×1", icon: "images/bookmark.png" },
      { text: "💌 Postcard ×1", icon: "images/postcard.png" },
      { text: "🎟 Ticket ×2", icon: "images/ticket.png" }
    ],
    quote: "See you again when winter fades.",
    class: "winter"
  },
  {
    name: "Summer (Special)",
    items: [
      { text: "📖 Bookmark ×1", icon: "images/bookmark.png" },
      { text: "💌 Postcard ×2", icon: "images/postcard.png" },
      { text: "🎟 Ticket ×1", icon: "images/ticket.png" },
      { text: "✨ Phone Charm / Keyring", icon: "images/phonecharm.png" }
    ],
    quote: "Some moments only happen once. Thank you for being part of this summer.",
    class: "summer"
  }
];

document.getElementById("drawBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  if (!username) {
    alert("Please enter your Threads name!");
    return;
  }

  const giftBox = document.getElementById("giftBox");
  giftBox.style.display = "block";

  setTimeout(() => {
    giftBox.style.display = "none";
    drawGift(username);
  }, 2000);
});

function drawGift(username) {
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ name: username }),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      const set = sets.find(s => s.name.includes(data.set));
      showCard(username, set);
      loadRemaining();
    } else {
      alert("All gifts are gone!");
    }
  })
  .catch(err => console.error(err));
}

function showCard(username, set) {
  const card = document.getElementById("resultCard");
  card.className = "card " + set.class;
  card.innerHTML = `
    <h3>🌻 Congratulations!</h3>
    <p>@${username}</p>
    <hr>
    <h4>You received: ${set.name}</h4>
    <p><i>${set.quote}</i></p>
    <div id="itemsContainer"></div>
  `;
  card.style.display = "block";

  revealItems(set.items);

  if (set.name.includes("Summer")) {
    launchConfetti();
  }
}

function revealItems(items) {
  const container = document.getElementById("itemsContainer");
  container.innerHTML = "";
  items.forEach((item, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.classList.add("item");

      const img = document.createElement("img");
      img.src = item.icon;
      img.alt = item.text;

      const span
