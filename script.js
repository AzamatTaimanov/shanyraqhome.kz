// Анимация чисел
function animateValue(id, end, duration) {
  let start = 0;
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  stepTime = Math.max(stepTime, 10);
  let obj = document.getElementById(id);
  let timer = setInterval(function() {
    current += increment;
    obj.innerText = current.toLocaleString() + " ₸";
    if (current == end) clearInterval(timer);
  }, stepTime);
}

// Если мы на page3.html → запуск логики
if (window.location.pathname.includes("page3.html")) {
  const params = new URLSearchParams(window.location.search);
  const income  = parseInt(params.get("income")) || 0;
  const debt    = parseInt(params.get("debt")) || 0;
  const payment = parseInt(params.get("payment")) || 0;
  const delays  = params.get("delays") || "no";
  const currentDelay = params.get("currentDelay") || "no";

  // формула (пример) — потом вставим твою
  let possible = ((income / 2) - payment) * 12 - debt;
  if (delays === "yes") possible *= 0.7; // уменьшаем на 30% при просрочках
  if (currentDelay === "yes") possible = 0;
  if (possible < 0) possible = 0;

  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("result").style.display = "block";

    document.getElementById("income").innerText = income.toLocaleString() + " ₸";
    document.getElementById("debt").innerText = debt.toLocaleString() + " ₸";
    document.getElementById("payment").innerText = payment.toLocaleString() + " ₸";

    // Анимация сумм поочередно
    setTimeout(() => animateValue("income", income, 2000), 0);
    setTimeout(() => animateValue("debt", debt, 2000), 2000);
    setTimeout(() => animateValue("payment", payment, 2000), 4000);
    setTimeout(() => animateValue("maxCredit", possible, 2000), 6000);
  }, 9000); // загрузка 9 секунд
}

// Автоподстановка +7 в телефоне
const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("focus", () => {
    if (!phoneInput.value.startsWith("+7")) {
      phoneInput.value = "+7";
    }
  });
}
