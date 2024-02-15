require('colors'); 

const fs = require('fs');

// Importa el módulo fs (file system) para trabajar con el sistema de archivos
const fs = require('fs');

// Carga los datos desde el archivo datos.json
const datosArchivo = require('./datos.json');

// Función principal del script
const main = async () => {
    // Limpia la consola
    console.clear();
    console.log(`************************************`);
    console.log(`****     PROYECTO CLASES         ***`);
    console.log(`************************************\n`);

    // Define la clase Producto para representar un producto en la tienda
    class Producto {
        #codigoProducto;
        #nombreProducto;
        #inventarioProducto;
        #precioProducto;

        constructor() {
            this.#codigoProducto;
            this.#nombreProducto;
            this.#inventarioProducto = 0;
            this.#precioProducto = 0;
        }

        // Métodos setter y getter para el código del producto
        set setCodigoProducto(value) {
            this.#codigoProducto = value;
        }
        get getCodigoProducto() {
            return this.#codigoProducto;
        }

        // Métodos setter y getter para el nombre del producto
        set setNombreProducto(value) {
            this.#nombreProducto = value;
        }
        get getNombreProducto() {
            return this.#nombreProducto;
        }

        // Métodos setter y getter para el inventario del producto
        set setInventarioProducto(value) {
            this.#inventarioProducto = value;
        }
        get getInventarioProducto() {
            return this.#inventarioProducto;
        }

        // Métodos setter y getter para el precio del producto
        set setPrecioProducto(value) {
            this.#precioProducto = value;
        }
        get getPrecioProducto() {
            return this.#precioProducto;
        }
    }

    // Define la clase ProductosTienda para representar la tienda y sus productos
    class ProductosTienda {
        #listaProductos;

        constructor() {
            this.#listaProductos = [];
        }

        // Método getter para obtener la lista de productos
        get getListaProductos() {
            return this.#listaProductos;
        }

        // Carga los productos desde el archivo datos.json
        cargaArchivoProductos() {
            let contador = 0;

            if (datosArchivo.length > 0) {
                datosArchivo.forEach(objeto => {
                    contador++;
                    let producto = new Producto;
                    producto.setCodigoProducto = objeto.codigoProducto;
                    producto.setNombreProducto = objeto.nombreProducto;
                    producto.setInventarioProducto = objeto.inventarioProducto;
                    producto.setPrecioProducto = objeto.precioProducto;
                    this.#listaProductos.push(producto);
                });
            } else {
                console.log(`ERROR, el archivo datos.json no contiene datos\n`.red);
            }
            console.log(`Total de productos cargados ==>`.blue + ` ${contador}`.red);
        }

        // Guarda los productos en el archivo datos.json
        grabaArchivoProductos() {
            const instanciaClaseAObjetos = this.getListaProductos.map(producto => {
                return {
                    codigoProducto: producto.getCodigoProducto,
                    nombreProducto: producto.getNombreProducto,
                    inventarioProducto: producto.getInventarioProducto,
                    precioProducto: producto.getPrecioProducto
                };
            });

            // Convierte la instancia de clase a formato JSON
            const cadenaJson = JSON.stringify(instanciaClaseAObjetos, null, 2);

            // Escribe la cadena JSON en el archivo datos.json
            const nombreArchivo = 'datos.json';
            fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');
            console.log(`DATOS GUARDADOS EN ${nombreArchivo}`.magenta);
        }

        // Muestra la información de los productos
        mostrarProductos() {
            this.getListaProductos.forEach(producto => {
                console.log(`             ` + producto.getCodigoProducto + `        /` +
                    `             ` + producto.getNombreProducto + `         /` +
                    `              ` + producto.getInventarioProducto + `         /` +
                    `               ` + producto.getPrecioProducto + `          /`);
            });
        }
    }

    // Crea una instancia de la clase ProductosTienda
    let productosTienda = new ProductosTienda;

    // Carga los productos desde el archivo datos.json
    productosTienda.cargaArchivoProductos();

    console.log(`DATOS APERTURA TIENDA`.blue);

    // Muestra la información de los productos al inicio de la apertura de la tienda
    productosTienda.mostrarProductos();

    // Modifica aleatoriamente el inventario de cada producto
    productosTienda.getListaProductos.forEach(producto => {
        producto.setInventarioProducto = Math.floor(Math.random() * (28 - 1) + 1);
    });

    console.log("DATOS CIERRE TIENDA".green);

    // Muestra la información de los productos al final del día de cierre de la tienda
    productosTienda.mostrarProductos();

    // Guarda los datos actualizados en el archivo datos.json
    productosTienda.grabaArchivoProductos();
};

// Llama a la función principal
main();


main();