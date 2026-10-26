const express = require('express');
const useragent = require('express-useragent');
const path = require('path');

const app = express();
const PORT = 3000;

//configura EJS como el motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware para analizar el user-agent y determinar si es móvil o escritorio
app.use(useragent.express());
//middleware para servir archivos estáticos (como imagenes) desde la carpeta 'public'
app.use(express.static('public'));

//ruta AWD (Diseño Adaptativo)
app.get('/adaptive', (req, res) => {
    
    if (req.useragent.isMobile) {
        //aplica la vista para móvil (sin el gráfico)
        res.render('mobile');
    } else {
        //applica la vista para escritorio (incluyendo el gráfico)
        res.render('desktop');
    }
});

//ruta RWD (diseño responsivo)
app.get('/responsive', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'responsive.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});