const mysql = require("mysql");
const crypto = require('crypto')

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "",
      user: "",
      password: "",
      port: 1
      //database: "carrefurgas",
    });

    this.keyEncrypt = crypto.scryptSync('M4nu$D3v#19Y', 'salt', 32)
    this.localIv = crypto.scryptSync('C4**3Fu*&a$', 'salt', 16)
    this.localIvHex = this.localIv.toString('hex')
  }

  //Conect database
  connect() {
    console.log("Conectando");
    this.connection.connect((err) => {
      if (err) throw err;
      console.log("Successful connection!");
    });
  }

  //End connection
  end() {
    this.connection.end((err) => {
      if (err) {
        console.error("Error disconnecting from the database:", err);
        return;
      }
      console.log("Disconnected from the MySQL database.");
    });
  }

  //Insert data in database
  insert(table, data, callback) {
    let keys = "";
    let values = "";
    const iv = crypto.randomBytes(16);

    for (let key in data) {
      keys += `${key.toString().toLowerCase()},`;
      if (key != "idemployee") {
        values += ` '${this.encrypt(data[key], iv)}',`;
      } else {
        values += ` '${this.encrypt(data[key], this.localIv)}',`;
      }
    }

    const query = `INSERT INTO ${table} (${keys} encryptkey) VALUES (${values} '${iv.toString('hex')}')`;
    this.connection.query(query, data, (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  //Consult in database
  select(id, callback) {
    const encryptId = this.encrypt(id, this.localIv)
    const query = `SELECT * FROM employee WHERE idemployee = '${encryptId}'`;
    this.connection.query(query, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      results = results[0]

      const iv = results["encryptkey"].toString('hex')
      for (let key in results) {
        if (key != "idemployee" && key != "encryptkey") {
          results[key] = this.decrypt(results[key], iv);
        } else if (key == "encryptkey") {

        } else { results[key] = this.decrypt(results[key], this.localIv); }
      }
      callback(null, results);
    });
  }


  test(callback){
    this.connection.query(`SELECT NOW() as now`, (err, results)=>{
      if(err){
        callback(err, null)
        return
      }
      callback(null, results)
    })
  }


  encrypt(data, iv) {

    if (data) {
      // Creating Cipheriv with its parameter
      let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.keyEncrypt), iv);
      // Updating text
      let encrypted = cipher.update(data);
      // Using concatenation
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      // Returning iv and encrypted data
      return encrypted.toString('hex')
    } else {
      return ''
    }


  }

  decrypt(data, iv) {
    if (data) {
      let keyData = ''
      if (/^[0-9A-Fa-f]+$/.test(iv)) {
        keyData = Buffer.from(iv, 'hex')
      } else {
        keyData = iv
      }
      const encrypted = Buffer.from(data, 'hex')

      const decrypt = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.keyEncrypt), keyData)
      return Buffer.concat([decrypt.update(encrypted), decrypt.final()]).toString()
    } else {
      return ''
    }
  }
}


module.exports = Database;
