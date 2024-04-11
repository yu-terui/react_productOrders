import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Top() {
  const navigate = useNavigate();
  let [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  // useEffect(() => {
  //   showCalendar(year, month);
  // }, [year, month, orders]);

  // DBの日付とカレンダーの日付、照合
  useEffect(() => {
    let calendar_table = document.getElementById("calendar_table");
    let cells = calendar_table.querySelectorAll("td");
    cells.forEach(function (cell) {
      for (let i = 0; i < orders.length; i++) {
        let order_dates = orders[i].date;
        let order_date = order_dates.split("-");
        if (cell.textContent === order_date[2]) {
          cell.classList.add("order_date");
          cell.innerHTML = order_date[2] + `<br>${orders[i].person}`;
        }
      }
    });
  }, [orders]);

  let weeks = ["日", "月", "火", "水", "木", "金", "土"];
  let dates = new Date();
  let year = dates.getFullYear();
  let month = dates.getMonth() + 1;
  // let date = dates.getDate();
  let startDate = new Date(year, month - 1, 1); //月の最初の日付
  let endDate = new Date(year, month, 0); //月の最後の日付
  let endDateCount = endDate.getDate(); //月の末日
  let startDay = startDate.getDay(); //月の最初の日の曜日を取得
  return (
    <div className="container">
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
      <section id="calendar_section">
        <div id="calendar_header">
          <button id="prev" type="button">
            &lt;
          </button>
          <h2>
            {year}/{month}
          </h2>
          <button id="next" type="button">
            &gt;
          </button>
        </div>
        <div id="calendar_body">
          <table id="calendar_table">
            <tbody>
              <tr className="grid_7">
                {weeks.map((week, index) => (
                  <th key={index}>{week}</th>
                ))}
              </tr>
              {Array.from({ length: 6 }, (_, w) => {
                //6つの行を生成
                const inner = [];
                for (let d = 0; d < 7; d++) {
                  const day = w * 7 + d - startDay + 1;
                  if (day <= 0 || day > endDateCount) {
                    inner.push(<td key={d}></td>);
                  } else {
                    inner.push(<td key={d}>{day}</td>);
                  }
                }
                return (
                  <tr key={w} className="grid_7">
                    {inner}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <div id="easyModal" className="modal">
        <div className="closeContain">
          <span className="modalClose">×</span>
        </div>
        <table className="modalContent"></table>
      </div>
    </div>
  );
}
export default Top;
