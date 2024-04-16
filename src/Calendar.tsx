import React, { useState, useEffect, useRef } from "react";
function Calendar() {
  const modal_ref = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  // const [orders, setOrders] = useState([]);
  // const [orders, setOrders] = useState<ordersObject>({person:"",phone:0,address:"",date:0,product:"",amount:0,price:0});
  const [orders, setOrders] = useState<ordersObject[]>([]);//ordersObjectの7つの方以外は配列に入れなくなる
  type ordersObject = {
    person: string;
    phone: string;
    address: string;
    date: string;
    product: string;
    amount: number;
    price: number;
  }

  let weeks = ["日", "月", "火", "水", "木", "金", "土"];
  let startDate = new Date(year, month - 1, 1); //月の最初の日付
  let endDate = new Date(year, month, 0); //月の最後の日付
  let endDateCount = endDate.getDate(); //月の末日
  let startDay = startDate.getDay(); //月の最初の日の曜日を取得

  // DB読み込み
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data:ordersObject[]) => setOrders(data));
  }, [month]);

  // カレンダー日付部分に名前表示
  // DBの日付とカレンダーの日付、照合
  useEffect(() => {
    let calendar_table = document.getElementById("calendar_table");
    let cells = calendar_table?.querySelectorAll("td");
    cells?.forEach(function (cell:any) {
      cell.classList.remove("order_date");
      for (let i = 0; i < orders.length; i++) {
        let order_dates = orders[i].date;
        let order_date = order_dates.split("-");
        let order_month = parseInt(order_date[1].replace(/^0+/, ""));
        let order_day = parseInt(order_date[2].replace(/^0+/, ""));
        if (
          month == order_month &&
          parseInt(cell.textContent) === order_day
        ) {
          cell.classList.add("order_date");
          cell.innerHTML = order_date[2] + `<br>${orders[i].person}`;
        }
      }
    });
  }, [month, orders]);

  // 日付クリックで詳細情報の表示
  document.addEventListener("click", function (e:any) {
    //modal_ref.currentがnull出ないことを確認してから処理
    if (modal_ref.current && e.target?.classList.contains("order_date")) {
      modal_ref.current.style.display = "block";
      let modalContent = modal_ref.current.querySelector(".modalContent")!;
      modalContent.innerHTML = "";
      for (let i = 0; i < orders.length; i++) {
        let order_dates = orders[i].date;
        let order_date = order_dates.split("-");
        // クリックされた日付=ordersの日付→詳細情報をモーダルに表示
        if (e.target?.textContent.replace(/[^0-9]/g, "") === order_date[2]) {
          let orderInfoTable = document.createElement("table");
          orderInfoTable.classList.add("modalTable");
          orderInfoTable.innerHTML = `
          <tr className="grid_2">
            <th>注文者：</th>
            <td>${orders[i].person}</td>
          </tr>
          <tr className="grid_2">
            <th>連絡先：</th>
            <td>${orders[i].phone}</td>
          </tr>
          <tr className="grid_2">
            <th>住所：</th>
            <td>${orders[i].address}</td>
          </tr>
          <tr className="grid_2">
            <th>日付：</th>
            <td>${orders[i].date}</td>
          </tr>
          <tr className="grid_2">
            <th>商品：</th>
            <td>${orders[i].product}</td>
          </tr>
          <tr className="grid_2">
            <th>個数：</th>
            <td>${orders[i].amount}</td>
          </tr>
          <tr className="grid_2">
            <th>価格：</th>
            <td>${orders[i].price}</td>
          </tr>
        `;
          modalContent.appendChild(orderInfoTable);
        }
      }
    }
  });
  const clk_close = () => {
    modal_ref.current!.style.display = "none";
  };

  const clk_prev = () => {
    //useStateを使って年月の状態を更新
    setMonth((prevMonth) => {
      let newMonth = prevMonth - 1;
      let newYear = year;
      if (newMonth < 1) {
        newYear--;
        newMonth = 12;
      }
      setYear(newYear);
      // 注文を再読み込み
      fetchOrders(newYear, newMonth);

      return newMonth;
    });
  };
  const clk_next = () => {
    setMonth((nextMonth) => {
      let newMonth = nextMonth + 1;
      let newYear = year;
      if (newMonth > 12) {
        newYear++;
        newMonth = 1;
      }
      setYear(newYear);
      // 注文を再読み込み
      fetchOrders(newYear, newMonth);
      return newMonth;
    });
  };
  const fetchOrders = (year: number, month:number) => {
    fetch(`/api?year=${year}&month=${month}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  };

  return (
    <section id="calendar_section">
      <div id="calendar_header">
        <button onClick={clk_prev} id="prev" type="button">
          &lt;
        </button>
        <h2>
          {year}/{month}
        </h2>
        <button onClick={clk_next} id="next" type="button">
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
      <div ref={modal_ref} id="easyModal" className="modal">
        <div className="closeContain">
          <span onClick={clk_close} className="modalClose">
            ×
          </span>
        </div>
        <div className="modalContent"></div>
      </div>
    </section>
  );
}
export default Calendar;
