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
  const navigate = useNavigate();
  function person_cng(event:React.ChangeEvent<HTMLInputElement>) {
      setPerson(event.target.value);
  }
  function phone_cng(event:React.ChangeEvent<HTMLInputElement>) {
    setPhone(event.target.value);
  }
  function address_cng(event:React.ChangeEvent<HTMLInputElement>) {
    setAddress(event.target.value);
  }
  function date_cng(event:React.ChangeEvent<HTMLInputElement>) {
    setDate(event.target.value);
  }
  function product_cng(event:React.ChangeEvent<HTMLInputElement>) {
    setProduct(event.target.value);
  }
  function amount_cng(event:React.ChangeEvent<HTMLInputElement>) {
    setAmount(event.target.value);
  }
  function price_cng(event:React.ChangeEvent<HTMLInputElement>) {
    setPrice(event.target.value);
  }
  const formData = new URLSearchParams();
  formData.append("person", person);
  formData.append("phone", phone);
  formData.append("address", address);
  formData.append("date", date);
  formData.append("product", product);
  formData.append("amount", amount);
  formData.append("price", price);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch("http://127.0.0.1:3001/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("ネットワークレスポンスが失敗しました");
        }
        return res.json();
      })
      .then(() => {
        setPerson("");
        setPhone("");
        setAddress("");
        setDate("");
        setProduct("");
        setAmount("");
        setPrice("");
        alert("追加しました");
      })
      .catch((error) => console.error("エラー:", error));
  }

  return (
    <div className="container">
      <section id="add_section">
        <form id="add_form" onSubmit={handleSubmit}>
          <h2>情報追加</h2>
          <div className="grid_2">
            <label htmlFor="person">注文者：</label>
            <input
              required
              type="text"
              id="person"
              name="person"
              value={person}
              onChange={person_cng}
            />
            <label htmlFor="phone">連絡先：</label>
            <input
              required
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={phone_cng}
            />
            <label htmlFor="address">住所：</label>
            <input
              required
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={address_cng}
            />
            <label htmlFor="date">日付：</label>
            <input
              required
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={date_cng}
            />
            <label htmlFor="product">商品：</label>
            <input
              required
              type="text"
              id="product"
              name="product"
              value={product}
              onChange={product_cng}
            />
            <label htmlFor="amount">個数：</label>
            <input
              required
              type="text"
              id="amount"
              name="amount"
              value={amount}
              onChange={amount_cng}
            />
            <label htmlFor="price">価格：</label>
            <input
              required
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
