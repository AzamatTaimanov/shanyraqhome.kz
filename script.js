const form = document.getElementById('calcForm');
const loading = document.getElementById('loading');
const resultDiv = document.getElementById('result');
const whatsappBtn = document.getElementById('whatsappBtn');

// Анимация чисел
function animateValue(id, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let obj = document.getElementById(id);
  let timer = setInterval(function () {
    current += increment;
    obj.innerText = current.toLocaleString() + " ₸";
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  loading.style.display = 'block';
  resultDiv.style.display = 'none';

  setTimeout(() => {
    loading.style.display = 'none';

    let income = +form.income.value;
    let debt = +form.debt.value;
    let payment = +form.payment.value;
    let possible = (income - payment) * 12 - debt;

    resultDiv.innerHTML = `
      <h3>Результат расчета</h3>
      <table border="1" cellpadding="10" id="resultTable">
        <tr><td>Доход</td><td>${income.toLocaleString()} ₸</td></tr>
        <tr><td>Долг</td><td>${debt.toLocaleString()} ₸</td></tr>
        <tr><td>Платежи</td><td>${payment.toLocaleString()} ₸</td></tr>
        <tr><td><b>Возможный кредит</b></td><td id="calcValue"><b>0 ₸</b></td></tr>
      </table>
    `;
    resultDiv.style.display = 'block';

    animateValue("calcValue", 0, possible > 0 ? possible : 0, 2000);
  }, 1500);
});

// WhatsApp заявка
whatsappBtn.addEventListener("click", () => {
  let message = "Здравствуйте, хочу получить бесплатную консультацию!%0A";
  const formData = new FormData(form);
  formData.forEach((value, key) => {
    message += `${key}: ${value}%0A`;
  });
  window.location.href = `https://wa.me/77478295825?text=${message}`;
});


