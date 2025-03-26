# PROYECTO_ANGULAR_NODE
SISTEMA GESTION DE TICKETES Y USUARIOS


REQUERIMIENTOS DE COMPATIBILIDAD
1) Angular CLI: 19.2.4
2) Node: 23.10.0 

PASOS DE EJECUCION  PARA INSTALAR LOS PAQUETES

1) Se necesita tener una instancia de mongo instalada en mi caso por tener mac
quizas los comandos cambien, una vez instalada ejecute mongodb con "mongosh" en consola,
es bueno tener un entorno grafico como mongodb compass. Para mi caso la instancia de mongo corre
en el puerto (localhost:27017)

2) Ya una vez teniendo en cuenta eso, proseguimos a instalar y correr el backend de node.js, utilice
express para gestionar mejor las carpetas, proseguimos a correr estos comandos
               ----    cd backend/mybackendapp
               ----    npm install   (Instalar dependencias)
               ----    npm start     (Correr Node, Para mi caso corre en el puerto 3000)
Si no hay problemas de nada proseguimos a instalar frontend

3) Vamos a instalar el frontend de angular 
               ----    cd frontend/myfrontendapp
               ----    npm install 
               ----    ng serve


COMO FUNCIONA LA APP

1) Lo primero es tener en cuenta el modulo sugerido tiene 2 roles
   - admin (Realiza operaciones de usuarios y ticketes)
   - user  (Realiza operaciones de ticketes)

2) Para considerar el backend crea la base de datos de mongo y genera un
usuario administrador con las siguientes credenciales
        new User({
              name: 'admin',
              email: 'admin@admin.com',
              password: '12345',
              role: 'admin'
        });

3) Esto tiene un bearer token cuando expira lo saca afuera de la pantalla
4) Tiene login y registro , el registro solo funciona para usuario con el rol user
5) Tiene las funciones de add, edit, delete, show y filter basico.


COSAS POR MEJORAR
1) Realizar paginado en las tablas
2) Mejorar mediaQuerys
3) Mejorar algunos textos de errores
4) Algunas validaciones 
5) Si hay errores que se muestran en consola eso es algo por mejorar