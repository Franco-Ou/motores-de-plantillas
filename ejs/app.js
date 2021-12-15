const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
app.use(express.json());

app.set('views', './views');
app.set('view engine', 'ejs');

const Contenedor = require("./contenedor.js");
const contenedorDeProductos = new Contenedor("productos.txt");
contenedorDeProductos.initializer();


app.get('/', (req, res) => {
    res.render('ejs-form');
});

app.get('/productos', async(req, res) => {

    try {
        const allItems = await contenedorDeProductos.getAll();
          res.render('ejs-list', {
              productsList: allItems
          })
      } catch (error) {
        console.log(error);
      }
});

app.post('/productos', async(req, res) => {
    try {
        if(req.body.inputName !== '' && req.body.inputPrice !== '' && req.body.inputPhoto !== '') {
          const addedProduct = await contenedorDeProductos.save(req.body);
          res.redirect('/productos');
          return addedProduct;
        } else {
          res.redirect('/productos');
        }
      } catch (error) {
        console.log("Hubo un error al agregar el producto");
        console.log(error);
      }
})

app.listen(process.env.PORT || 3000);
console.log("Running");