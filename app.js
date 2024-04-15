// CommonJSで関連パッケージの読み込み
const express = require('express');
const cors = require('cors');
const app = express(); //インスタンス化してappに代入
// アクセス先のポート番号を定義
const port = 3001

// CORS ミドルウェアの使用
app.use(cors());

// JSオブジェクト形式に変換
app.use(express.urlencoded({ extended: false }))

//req.bodyの中に送信したデータが保存される
app.set("view engine", "ejs"); //テンプレートエンジンをEJSに

const mysql2 = require('mysql2');
const con = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "order_management",
  dateStrings: 'date',
  multipleStatements: true,
});
app.use("/public", express.static("public"));
// favicon.icoがリクエストされた場合、空のレスポンスを返す。
app.get("/favicon.ico", (req, res) => {
  res.status(204);
});
// mysqlからデータを持ってくる
app.get("/api", (req, res) => {
  const sql = "select * from `orders`";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});
app.post("/api/post", (req, res) => {
  // const sql = "INSERT INTO `orders` SET ?";
  const sql = "INSERT INTO `orders` (person,phone,address,date,product,amount,price) VALUES (?,?,?,?,?,?,?)";
  const { person, phone, address, date, product, amount, price } = req.body;
  const values = [person, phone, address, date, product, amount, price];
  con.query(sql, values, function (err, result) {
    if (err) {
      console.error("INSERT エラー:", err);
      return res.status(500).json({ error: "データベースへの挿入中にエラーが発生しました" });
    }
    res.status(201).json(result);
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
