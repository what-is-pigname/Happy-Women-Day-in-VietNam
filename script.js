const welcome = document.querySelector("#welcome");
const mainPage = document.querySelector("#mainPage");
const nameForm = document.querySelector("#nameForm");
const nameInput = document.querySelector("#nameInput");
const headerName = document.querySelector("#headerName");
const wishCard = document.querySelector("#wishCard");
const wishTitle = document.querySelector("#wishTitle");
const wishText = document.querySelector("#wishText");
const photoWall = document.querySelector("#photoWall");
const toast = document.querySelector("#toast");

const photos = [
  ["https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=85","Dịu dàng như một đóa hoa"],
  ["https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=700&q=85","Niềm vui ở bên nhau"],
  ["https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=85","Bình yên trong nắng"],
  ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85","Đi đâu cũng thấy đẹp"],
  ["https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=700&q=85","Những điều đáng nhớ"],
  ["https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=700&q=85","Một ngày thật rực rỡ"],
  ["https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=700&q=85","Hạnh phúc từ điều nhỏ"],
  ["https://images.unsplash.com/photo-1495231916356-a86217efff12?auto=format&fit=crop&w=700&q=85","Gửi chút yêu thương"]
];

function shuffle(list) {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function renderPhotos() {
  photoWall.replaceChildren();
  shuffle(photos).forEach(([url, caption], index) => {
    const card = document.createElement("figure");
    card.className = "photo-card";
    card.style.setProperty("--rotation", `${(Math.random() * 10 - 5).toFixed(1)}deg`);
    card.style.setProperty("--delay", `${index * 80}ms`);
    const img = document.createElement("img");
    img.src = url;
    img.alt = caption;
    img.loading = "lazy";
    img.onerror = () => { img.style.background = "linear-gradient(135deg,#f8d8e0,#fff1d8)"; };
    const text = document.createElement("figcaption");
    text.textContent = caption;
    card.append(img, text);
    photoWall.append(card);
  });
}

function toastMessage(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function petals() {
  const symbols = ["♥", "♡", "✿", "✧"];
  for (let i = 0; i < 22; i++) {
    const item = document.createElement("span");
    item.className = "petal";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.setProperty("--left", `${Math.random() * 100}vw`);
    item.style.setProperty("--duration", `${3 + Math.random() * 3}s`);
    item.style.setProperty("--drift", `${Math.random() * 160 - 80}px`);
    item.style.fontSize = `${14 + Math.random() * 20}px`;
    document.body.append(item);
    item.addEventListener("animationend", () => item.remove(), { once: true });
  }
}

function openGreeting(rawName) {
  const name = rawName.trim();
  if (!name) {
    toastMessage("Bạn nhập tên trước nhé 💗");
    nameInput.focus();
    return;
  }
  headerName.textContent = name;
  wishTitle.textContent = `Chúc mừng 20/10, ${name}!`;
  wishText.textContent = `Chúc ${name} luôn mạnh khỏe, xinh đẹp, tự tin và hạnh phúc. Mong mỗi ngày của bạn đều có thật nhiều tiếng cười, những điều tử tế và những người yêu thương ở bên. Hãy luôn tỏa sáng theo cách riêng của mình nhé!`;
  welcome.classList.add("hidden");
  mainPage.classList.remove("hidden");
  wishCard.classList.remove("show");
  void wishCard.offsetWidth;
  wishCard.classList.add("show");
  window.scrollTo({ top: 0, behavior: "smooth" });
  petals();
}

nameForm.addEventListener("submit", event => {
  event.preventDefault();
  openGreeting(nameInput.value);
});

document.querySelector("#changeName").addEventListener("click", () => {
  mainPage.classList.add("hidden");
  welcome.classList.remove("hidden");
  nameInput.value = headerName.textContent;
  nameInput.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

renderPhotos();
