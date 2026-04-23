const gameState = {
  starter: null
};

const scenes = {

  intro: {
    name: "Professor Oak",
    text: "Welcome to the world of Pokémon!",
    bg: "lab.png",
    rightChar: "oak.png",
    next: "intro2"
  },

  intro2: {
    name: "Professor Oak",
    text: "It's time to choose your first Pokémon.",
    next: "starterChoice"
  },

  starterChoice: {
    name: "Professor Oak",
    text: "Which Pokémon do you choose?",
    choices: [
      {
        text: "🔥 Fire (Charmander)",
        action: () => gameState.starter = "Charmander",
        next: "chosen"
      },
      {
        text: "💧 Water (Squirtle)",
        action: () => gameState.starter = "Squirtle",
        next: "chosen"
      },
      {
        text: "🌱 Grass (Bulbasaur)",
        action: () => gameState.starter = "Bulbasaur",
        next: "chosen"
      }
    ]
  },

  chosen: {
    name: "Professor Oak",
    text: () => `Ah, so you chose ${gameState.starter}! Excellent choice.`,
    next: "rivalAppears"
  },

  rivalAppears: {
    name: "Rival",
    text: "Hey! I was going to pick that one!",
    leftChar: "rival.png",
    next: "end"
  },

  end: {
    name: "Narrator",
    text: "Your adventure begins now..."
  }
};

let currentScene = "intro";

const nameEl = document.getElementById("name");
const dialogueEl = document.getElementById("dialogue");
const bgEl = document.getElementById("background");
const leftCharEl = document.getElementById("leftCharacter");
const rightCharEl = document.getElementById("rightCharacter");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");

function loadScene(sceneKey) {
  const scene = scenes[sceneKey];

  nameEl.textContent = scene.name;

  // Handle dynamic text
  dialogueEl.textContent =
    typeof scene.text === "function"
      ? scene.text()
      : scene.text;

  bgEl.src = scene.bg || "";
  leftCharEl.src = scene.leftChar || "";
  rightCharEl.src = scene.rightChar || "";

  choicesEl.innerHTML = "";

  if (scene.choices) {
    nextBtn.style.display = "none";

    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;

      btn.onclick = () => {
        if (choice.action) choice.action();
        currentScene = choice.next;
        loadScene(currentScene);
      };

      choicesEl.appendChild(btn);
    });

  } else {
    nextBtn.style.display = "block";
  }
}

nextBtn.onclick = () => {
  const next = scenes[currentScene].next;
  if (next) {
    currentScene = next;
    loadScene(currentScene);
  }
};

loadScene(currentScene);