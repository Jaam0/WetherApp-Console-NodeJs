require('dotenv').config();
const {leerInput,inquirerMenu, pausa, listarLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

// console.log(process.env);

const main = async() => {
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //Mostrar mensaje
                const busqueda = await leerInput('Ciudad:'); 
                //Buscar los lugares
                const lugares = await busquedas.Ciudad(busqueda);
                //Seleccionar el lugar
                console.log();
                const idBusc = await listarLugares(lugares);
                
                if (idBusc === '0') continue;
 
                const lugarSel = lugares.find( l => l.id === idBusc);

                busquedas.agregarHistorial(lugarSel.nombre);
                // console.log(lugarSel);
                const {id,nombre,lng,lat} = lugarSel;
                //Clima
                const clima = await busquedas.climaLugar(lat, lng);
                const {desc,min,max,temp} = clima;

                //Mostrar resultados
                console.clear();
                console.log(`\nInformacion de la ciudad\n`.green);
                console.log(`Ciudad:${nombre.green}`,);
                console.log(`Lat:${lat}`,);
                console.log(`Lng:${lng}`,);
                console.log(`Temperatura:${temp}`,);
                console.log(`Minima:${min}`,);
                console.log(`Maxima:${max}`,);
                console.log(`Como esta el clima:${desc.green}`,);
            break;

            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i) =>{
                    const idx = `${i + 1}`.green;
                    console.log(`${idx} ${lugar}`);
                });
            break;
        
            default:
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt !== 0);

    
};

main();