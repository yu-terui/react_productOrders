import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ordersObject = {
  id: number;
  person: string;
  phone: string;
  address: string;
  date: string;
  product: string;
  amount: number;
  price: number;
};
function List() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<ordersObject[]>([]);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data:ordersObject[]) => setOrders(data));
  }, []);
  return (
    <section id="orders_section">
      <h2>注文情報一覧</h2>
      <table id="orders_table">
        <tbody>
          <tr>
            <th>注文番号</th>
            <th>注文者</th>
            <th>連絡先</th>
            <th>住所</th>
            <th>日付</th>
            <th>商品</th>
            <th>個数</th>
            <th>価格</th>
          </tr>
          {orders &&
            orders.map((order, index) => (
              <tr key={index}>
          <td>{order.id}</td>
          <td>{order.person}</td>
          <td>{order.phone}</td>
          <td>{order.address}</td>
          <td>{order.date}</td>
          <td>{order.product}</td>
          <td>{order.amount}</td>
          <td>{order.price}</td>
          </tr>
            ))}
        </tbody>
      </table>
      <button id="add_info" onClick={() => navigate("/AddInfo")}>
        情報を追加する
      </button>
    </section>
  );
}
export default List;
