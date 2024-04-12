// CommonJSで関連パッケージの読み込み
const express = require('express');
const cors = require('cors');
const app = express(); //インスタンス化してappに代入
// アクセス先のポート番号を定義
const port = 3001

// CORS ミドルウェアの使用
app.use(cors());

// JSオブジェクト形式に変換
app.use(express.urlencoded({ extend: true }))

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
// cssファイルの取得
app.use("/assets", express.static("assets"));
// favicon.icoがリクエストされた場合、空のレスポンスを返す。
app.get("/favicon.ico", (req, res) => {
  res.status(204);
});
// mysqlからデータを持ってくる
app.get("/api", (req, res) => {
  const sql = "select * from orders";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});
app.post("/api/post", (req, res) => {
  const sql = "INSERT INTO orders SET ?";
  con.query(sql, req.body, function (err, result) {
    if (err) throw err;
    res.status(201).json(result);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
