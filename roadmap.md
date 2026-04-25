https://www.mongodb.com/try/download/community

RELACIONALES - NO RELACIONALES

sql - mysql - oracle - postgres - mariadb
mongodb - cassandra - firebase

- el arranque de express
- middlewares basicos (app.use(express.json()) y app.use(cookieParser()))
- rutas basicas
- levantar una db
- intro a cookies
- intro a sesiones
- ya tenemos cookies
- ya tenemos sesiones 
- ya tenemos store

Proximo : 
- cambiar a store de DB
- JWT
- encrtiptar/hashear las contraseñas



Solo cookies :

cliente (email,pass)      ------------------->  servidor 
cliente                   <-------------------  servidor(cookie)
cliente (guardo cookie)
cliente (cookie)          ------------------->  servidor : verifica autenticidad de cookie y nos deja pasar



Cookies con Session : 

cliente (email,pass)      ------------------->  servidor 
                                                servidor (crea sesion)
cliente                   <-------------------  servidor(cookie)
cliente (guardo cookie)
cliente (cookie)          ------------------->  servidor : verifica autenticidad de cookie y busca la sesion
