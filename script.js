const wishForm = document.querySelector("#wishForm");
const recipientInput = document.querySelector("#recipientName");
const wishCard = document.querySelector("#wishCard");
const wishTitle = document.querySelector("#wishTitle");
const wishText = document.querySelector("#wishText");
const photoWall = document.querySelector("#photoWall");
const toast = document.querySelector("#toast");

const photoMemories = [
  {
    url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=85",
    caption: "Dịu dàng như một đóa hoa"
  },
  {
    url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=700&q=85",
    caption: "Niềm vui ở bên nhau"
  },
  {
    url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=85",
    caption: "Bình yên trong nắng"
  },
  {
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85",
    caption: "Đi đâu cũng thấy đẹp"
  },
  {
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=700&q=85",
    caption: "Những điều đáng nhớ"
  },
  {
    url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=700&q=85",
    caption: "Một ngày thật rực rỡ"
  },
  {
    url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=700&q=85",
    caption: "Hạnh phúc từ điều nhỏ"
  },
  {
    url: "https://images.unsplash.com/photo-1495231916356-a86217efff12?auto=format&fit=crop&w=700&q=85",
    caption: "Gửi chút yêu thương"
  }
];

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function renderPhotos() {
  photoWall.replaceChildren();

  shuffle(photoMemories).forEach((photo, index) => {
    const card = document.createElement("figure");
    card.className = "photo-card";
    card.style.setProperty("--rotation", `${(Math.random() * 10 - 5).toFixed(1)}deg`);
    card.style.setProperty("--delay", `${index * 90}ms`);

    const image = document.createElement("img");
    image.src = photo.url;
    image.alt = photo.caption;
    image.loading = "lazy";
    image.onerror = () => {
      image.alt = "Không tải được ảnh. Hãy kiểm tra kết nối Internet.";
      image.style.background = "linear-gradient(135deg, #f8d8e0, #fff1d8)";
    };

    const caption = document.createElement("figcaption");
    caption.className = "photo-caption";
    caption.textContent = photo.caption;

    card.append(image, caption);
    photoWall.append(card);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

wishForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = recipientInput.value.trim();

  if (!name) {
    showToast("Bạn hãy nhập tên người nhận nhé!");
    recipientInput.focus();
    return;
  }

  // textContent giúp tên người nhận được hiển thị an toàn như văn bản.
  wishTitle.textContent = `Chúc mừng 20/10, ${name}!`;
  wishText.textContent =
    `Chúc ${name} luôn mạnh khỏe, xinh đẹp, tự tin và hạnh phúc. ` +
    `Mong mỗi ngày của bạn đều có thật nhiều tiếng cười, những điều tử tế ` +
    `và những người yêu thương ở bên. Hãy luôn tỏa sáng theo cách riêng của mình nhé!`;

  wishCard.classList.remove("revealed");
  void wishCard.offsetWidth; // Khởi động lại hiệu ứng khi gửi lời chúc lần nữa.
  wishCard.classList.add("revealed");
  wishCard.scrollIntoView({ behavior: "smooth", block: "center" });
  showToast(`Đã tạo lời chúc dành cho ${name} 💗`);
  launchHearts();
});

function launchHearts() {
  const symbols = ["♥", "♡", "✿", "✧"];
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement("span");
    petal.className = "floating-petal";
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.setProperty("--left", `${Math.random() * 100}vw`);
    petal.style.setProperty("--duration", `${3 + Math.random() * 3}s`);
    petal.style.setProperty("--drift", `${Math.random() * 160 - 80}px`);
    petal.style.fontSize = `${14 + Math.random() * 20}px`;
    document.body.append(petal);
    petal.addEventListener("animationend", () => petal.remove(), { once: true });
  }
}

renderPhotos();
