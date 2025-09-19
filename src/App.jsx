import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [income, setIncome] = useState(0);
  const [debt, setDebt] = useState(0);
  const [payment, setPayment] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const possible = (income - payment) * 12 - debt;
      setResult(possible > 0 ? possible : 0);
    }, 1500);
  };

  const sendToWhatsApp = () => {
    const message = `Здравствуйте! Хочу получить консультацию.%0A
Доход: ${income} ₸%0A
Долг: ${debt} ₸%0A
Платежи: ${payment} ₸%0A
Возможный кредит: ${result ?? 0} ₸`;
    window.location.href = `https://wa.me/77478295825?text=${message}`;
  };

  return (
    <div className="container">
      <header>
        <img src="/logo.png" alt="Shanyraq Home" className="logo" />
        <h1>Shanyraq Home</h1>
        <p>Простые условия, лёгкие возможности</p>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Доход:
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(+e.target.value)}
          />
        </label>
        <label>
          Долг:
          <input
            type="number"
            value={debt}
            onChange={(e) => setDebt(+e.target.value)}
          />
        </label>
        <label>
          Платежи:
          <input
            type="number"
            value={payment}
            onChange={(e) => setPayment(+e.target.value)}
          />
        </label>
        <button type="submit">Рассчитать</button>
      </form>

      {loading && <p className="loading">Загрузка...</p>}

      {result !== null && !loading && (
        <div className="result">
          <h3>Результат расчета</h3>
          <p>Доход: {income.toLocaleString()} ₸</p>
          <p>Долг: {debt.toLocaleString()} ₸</p>
          <p>Платежи: {payment.toLocaleString()} ₸</p>
          <p>
            <b>Возможный кредит: {result.toLocaleString()} ₸</b>
          </p>
          <button onClick={sendToWhatsApp} className="whatsappBtn">
            Отправить в WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
