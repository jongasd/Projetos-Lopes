const UI = {
  greeting: document.getElementById("greeting"),
  playBtn: document.getElementById("play-pause-btn"),
  recentsGrid: document.getElementById("recents-grid"),
  playlists: document.getElementById("playlist-list"),
};

const data = {
  recents: [
    { title: "Coleção MPB", cover: "https://picsum.photos/seed/1/80" },
    { title: "Top Brasil", cover: "https://picsum.photos/seed/2/80" },
    { title: "Rock Classics", cover: "https://picsum.photos/seed/3/80" },
    { title: "Foo Fighters", cover: "https://picsum.photos/seed/4/80" },
  ],
  playlists: [
    "Passinho",
    "Maroon 5",
    "Tenha um Ótimo Dia!",
    "Tiësto 04",
    "Samba Rock",
  ],
};

function init() {
  // 1. Saudação
  const hour = new Date().getHours();
  if (hour < 12) UI.greeting.innerText = "Bom dia";
  else if (hour < 18) UI.greeting.innerText = "Boa tarde";
  else UI.greeting.innerText = "Boa noite";

  // 2. Renderizar Recentes
  UI.recentsGrid.innerHTML = data.recents
    .map(
      (item) => `
        <div class="recent-card group">
            <img src="${item.cover}" alt="${item.title}" width="80">
            <span class="font-bold px-4">${item.title}</span>
            <button class="absolute right-4 w-12 h-12 bg-green-500 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <span class="material-symbols-outlined text-black">play_arrow</span>
            </button>
        </div>
    `,
    )
    .join("");

  // 3. Renderizar Playlists lateral
  UI.playlists.innerHTML = data.playlists
    .map(
      (p) => `
        <div class="text-sm text-gray-400 hover:text-white py-1 cursor-pointer truncate px-4">${p}</div>
    `,
    )
    .join("");

  // 4. Play/Pause Toggle
  UI.playBtn.addEventListener("click", () => {
    const icon = UI.playBtn.querySelector("span");
    icon.innerText = icon.innerText === "play_arrow" ? "pause" : "play_arrow";
  });
}

document.addEventListener("DOMContentLoaded", init);
