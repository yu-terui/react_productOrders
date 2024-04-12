import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddInfo() {
  const [person, setPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  function person_cng(e) {
    setPerson(e.target.value);
  }
  function phone_cng(e) {
    setPhone(e.target.value);
  }
  function address_cng(e) {
    setAddress(e.target.value);
  }
  function date_cng(e) {
    setDate(e.target.value);
  }
  function product_cng(e) {
    setProduct(e.target.value);
  }
  function amount_cng(e) {
    setAmount(e.target.value);
  }
  function price_cng(e) {
    setPrice(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        person,
        phone,
        address,
        date,
        product,
        amount,
        price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPerson("");
        setPhone("");
        setAddress("");
        setDate("");
        setProduct("");
        setAmount("");
        setPrice("");
      })
      .catch((error) => console.error("エラー:", error));
    alert("追加しました");
  }
  const navigate = useNavigate();
  return (
    <div className="container">
      <section id="add_section">
        <form id="add_form" onSubmit={handleSubmit}>
          <h2>情報追加</h2>
          <div className="grid_2">
            <label htmlFor="person">注文者：</label>
            <input
              type="text"
              id="person"
              name="person"
              value={person}
              onChange={person_cng}
            />
            <label htmlFor="phone">連絡先：</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={phone_cng}
            />
            <label htmlFor="address">住所：</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={address_cng}
            />
            <label htmlFor="date">日付：</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={date_cng}
            />
            <label htmlFor="product">商品：</label>
            <input
              type="text"
              id="product"
              name="product"
              value={product}
              onChange={product_cng}
            />
            <label htmlFor="amount">個数：</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={amount}
              onChange={amount_cng}
            />
            <label htmlFor="price">価格：</label>
            <input
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={price_cng}
            />
          </div>
          <button id="add_btn" type="submit">
            追加
          </button>
        </form>
      </section>
      <button id="back_btn" onClick={() => navigate("/")}>
        TOPへ戻る
      </button>
    </div>
  );
}
export default AddInfo;
