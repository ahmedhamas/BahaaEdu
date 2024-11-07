const db = require("../database/index");

class Grades {
  constructor(grade) {
    this.grade = grade;
  }
  GetAll() {
    const sql = "SELECT * FROM Grade";
    return new Promise((resolve, reject) => {
      db.all(sql, (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
  Create() {
    console.log(this.grade);
    const sql = "INSERT INTO Grade (grade_name) VALUES (?)";
    return new Promise((resolve, reject) => {
      db.run(sql, [this.grade.grade_name], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
  Update() {
    const sql = "UPDATE Grade SET grade_name = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(sql, [this.grade.grade_name, this.grade.id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
  Delete() {
    const sql = "DELETE FROM Grade WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.run(sql, [this.grade.id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
}

module.exports = Grades;
