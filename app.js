const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'mydb',
});

// MySQL 연결
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패: ' + err.stack);
    return;
  }
  console.log('MySQL 연결 성공');
});

// 데이터 추가
app.post('/data/add', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO mytable (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) {
      res.status(500).send('데이터를 추가하는 중 오류가 발생했습니다.');
      return;
    }
    res.send('데이터가 성공적으로 추가되었습니다.');
  });
});

// 데이터 가져오기
app.get('/data', (req, res) => {
  db.query('SELECT * FROM mytable', (err, results) => {
    if (err) {
      res.status(500).send('데이터를 가져오는 중 오류가 발생했습니다.');
      return;
    }
    res.json(results);
  });
});

// 데이터 삭제
app.delete('/data/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM mytable WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).send('데이터를 삭제하는 중 오류가 발생했습니다.');
      return;
    }
    res.send('데이터가 성공적으로 삭제되었습니다.');
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});