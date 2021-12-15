const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/ejs', (req, res) => {
   res.render('mensaje.ejs', {
       mensaje: "Mensaje desde ejs"
   }) 
})

app.listen(process.env.PORT || 3000);
console.log("Running");