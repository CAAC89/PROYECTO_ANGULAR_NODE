# PROYECTO_ANGULAR_NODE
SISTEMA GESTION DE TICKETES Y USUARIOS

--------------SPANISH-----------------
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


--------------ENGLISH-----------------
COMPATIBILITY REQUIREMENTS
Angular CLI: 19.2.4
Node: 23.10.0
EXECUTION STEPS TO INSTALL THE PACKAGES
1) You need to have a MongoDB instance installed. Since I am using a Mac, the commands might differ. Once installed, run MongoDB using mongosh in the terminal. It is also useful to have a graphical interface like MongoDB Compass. In my case, the MongoDB instance runs on port (localhost:27017).
2) Once that is set up, we proceed to install and run the Node.js backend. I used Express to better manage the folder structure. Run the following commands:

cd backend/mybackendapp  
npm install   (Install dependencies)  
npm start     (Run Node.js. In my case, it runs on port 3000)  

If there are no issues, we proceed to install the frontend.

3) Now, let's install the Angular frontend:

cd frontend/myfrontendapp  
npm install  
ng serve  

HOW THE APP WORKS
1) The suggested module includes two roles:
admin (Manages users and tickets)
user (Manages tickets)
2) The backend creates the MongoDB database and generates an admin user with the following credentials:

 new User({
    name: 'admin',
    email: 'admin@admin.com',
    password: '12345',
    role: 'admin'
});

3) The system uses a bearer token, and when it expires, it logs the user out.
4) The app includes login and registration, but registration is only available for users with the user role.
5) The system supports add, edit, delete, show, and basic filtering operations.

AREAS FOR IMPROVEMENT
1) Implement pagination in tables.
2) Improve media queries.
3) Enhance some error messages.
4) Add more validations.
5) Fix console errors if they appear.