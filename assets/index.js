const http = require('http')
const url = require('url')
const fs = require('fs')
// 1. Se crea un servidor con el método createServer del módulo http que esté disponible en el puerto 8080.
http
    .createServer(function (req, res) {
        // Almacena los parámetros de la consulta en una const con el método parse del módulo url y su propiedad query.
        const params = url.parse(req.url, true).query
        const nombre = params.nombre
        const contenido = params.contenido
        //2. Crea una ruta que con el método writeFile del módulo File System
        // que crea un archivo usando los parámetros nombre del archivo y contenido ( en rectangulos vacios) de la url.
        // Si se cumple la condición,
        if (req.url.includes('/crear')) {
            fs.writeFile(nombre, contenido, () => {
                res.write('Archivo creado con exito!')//6. devuelve un mensaje de éxito al cliente.
                res.end()
            })
        }
        // 3. Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es
        // declarado en los parámetros de la consulta recibida.
        //Crea una ruta “/leer” que use el método readFile del módulo FS para
        //obtener el contenido del archivo cuyo nombre debe ser el obtenido por query string. (lee el contenido del archivo)
        if (req.url.includes('/leer')) {
            fs.readFile(nombre, (err, data) => {
                res.write(data)
                res.end()
            })
        }
        // 4. Disponibilizar una ruta para renombrar un archivo, cuyo nombre y nuevo nombre es
        // declarado en los parámetros de la consulta recibida.
        // Paso 1 Crear ruta “/renombrar” que procese el método rename del módulo
        //fileSystem especificando el nombre del archivo devolviendo en su callback un mensaje de éxito.
        if (req.url.includes('/renombrar')) {
            fs.rename('Repertorio.txt', nombre, (err, data) => {
                res.write(`Archivo Repertorio.txt renombrado por ${nombre}`) // 6. Devolver un mensaje declarando que fue renombrado
                res.end()
            })
        }
        // 5. Disponibilizar una ruta para eliminar un archivo, cuyo nombre es declarado en los
        // parámetros de la consulta recibida.
        // Paso 2 Crea ruta “/eliminar” que procese el método unlink del módulo FS
        //especificando el nombre del archivo devolviendo en su callback un mensaje de éxito.
        if (req.url.includes('/eliminar')) {
            fs.unlink(nombre, (err, data) => {
                res.write(`Archivo ${nombre} eliminado con exito`) // 6. Devolver un mensaje declarando el éxito
                res.end()
            })
        }
    })
    .listen(8080, () => console.log('Escuchando el puerto 8080'))

// 6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
// recibida.

// 7. Agrega la fecha actual al comienzo del contenido de cada archivo creado en formato
// “dd / mm / yyyy”. Considera que si el día o el mes es menor a 10 concatenar un “0” a la
// izquierda. (Opcional)


// 8. En la ruta para renombrar, devuelve un mensaje de éxito incluyendo el nombre
// anterior del archivo y su nuevo nombre de forma dinámica. (Opcional)


// 9. En el mensaje de respuesta de la ruta para eliminar un archivo, devuelve el siguiente
// mensaje: “Tu solicitud para eliminar el archivo < nombre_archivo > se está
// procesando”, y luego de 3 segundos envía el mensaje de éxito mencionando el
// nombre del archivo eliminado. (Opcional)