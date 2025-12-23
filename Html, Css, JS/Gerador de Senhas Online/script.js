// Seleção de Elementos DOM
const displaySenha = document.getElementById("password-output");
const btnCopiar = document.getElementById("copy-btn");
const msgCopiado = document.getElementById("copy-message");
const sliderLength = document.getElementById("length-slider");
const labelLength = document.getElementById("length-value");
const btnGerar = document.getElementById("generate-btn");

const chkUppercase = document.getElementById("uppercase");
const chkLowercase = document.getElementById("lowercase");
const chkNumbers = document.getElementById("numbers");
const chkSymbols = document.getElementById("symbols");

const strengthIndicator = document.getElementById("strength-indicator");
const strengthText = document.getElementById("strength-text");

// Conjuntos de Caracteres
const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  symbol: "!@#$%&*()_+{}[]<>?",
};

// Inicialização
window.addEventListener("load", () => {
  generatePassword();
});

// Event Listeners (Tornar dinâmico)
sliderLength.addEventListener("input", syncLength);
[chkUppercase, chkLowercase, chkNumbers, chkSymbols].forEach((chk) => {
  chk.addEventListener("change", generatePassword);
});
btnGerar.addEventListener("click", generatePassword);
btnCopiar.addEventListener("click", copyToClipboard);

// Função para sincronizar slider com texto
function syncLength() {
  labelLength.innerText = sliderLength.value;
  generatePassword();
}

// Lógica Principal de Geração
function generatePassword() {
  const length = +sliderLength.value;
  let availableChars = "";
  let mandatoryChars = "";

  // Construção do pool de caracteres
  if (chkUppercase.checked) {
    availableChars += CHARS.upper;
    mandatoryChars += getRandomChar(CHARS.upper);
  }
  if (chkLowercase.checked) {
    availableChars += CHARS.lower;
    mandatoryChars += getRandomChar(CHARS.lower);
  }
  if (chkNumbers.checked) {
    availableChars += CHARS.number;
    mandatoryChars += getRandomChar(CHARS.number);
  }
  if (chkSymbols.checked) {
    availableChars += CHARS.symbol;
    mandatoryChars += getRandomChar(CHARS.symbol);
  }

  // Validação: Se nada for selecionado
  if (availableChars === "") {
    displaySenha.value = "Selecione opções!";
    calculateStrength(0);
    return;
  }

  // Preenche o restante da senha
  let generatedPassword = mandatoryChars;
  for (let i = mandatoryChars.length; i < length; i++) {
    generatedPassword += getRandomChar(availableChars);
  }

  // Embaralha a senha para que os caracteres obrigatórios não fiquem apenas no início
  generatedPassword = generatedPassword
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  displaySenha.value = generatedPassword;
  calculateStrength(generatedPassword.length);
}

// Função Auxiliar para pegar char aleatório
function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

// Função de Copiar
async function copyToClipboard() {
  const senha = displaySenha.value;
  if (!senha || senha === "Selecione opções!") return;

  try {
    await navigator.clipboard.writeText(senha);
    msgCopiado.classList.add("active");
    setTimeout(() => {
      msgCopiado.classList.remove("active");
    }, 2000);
  } catch (err) {
    console.error("Falha ao copiar", err);
  }
}

// Medidor de Força Visual
function calculateStrength(length) {
  // Reseta classes
  strengthIndicator.style.backgroundColor = "transparent";
  strengthIndicator.style.width = "0%";

  let score = 0;

  if (chkUppercase.checked) score++;
  if (chkLowercase.checked) score++;
  if (chkNumbers.checked) score++;
  if (chkSymbols.checked) score++;

  // Lógica simples de força
  if (length < 6 || score === 1) {
    updateStrengthUI("33%", "var(--strength-weak)", "Fraca");
  } else if (length < 10 || score === 2) {
    updateStrengthUI("66%", "var(--strength-medium)", "Média");
  } else {
    updateStrengthUI("100%", "var(--strength-strong)", "Forte");
  }
}

function updateStrengthUI(width, color, text) {
  strengthIndicator.style.width = width;
  strengthIndicator.style.backgroundColor = color;
  strengthText.innerText = text;
  strengthText.style.color = color;
}
