$ opencode --modo migracion
Jóvenes creaTIvos 2026 · Módulo React
Migra tu proyecto a React
con OpenCode Guía paso a paso para pedirle ayuda a tu agente de IA sin perderte en
el camino: qué prompt usar, cómo arrancar, cómo avanzar por fases y
qué hacer cuando algo sale mal.
HTML + CSS + JS vanilla → React 19 + Vite Express + MongoDB local
mi-proyecto — después de la migración
mi-proyecto/
├── backend/      ← tu API de siempre (Express + MongoDB). Solo cambia de carpeta.
│   └── src/server.js
├── frontend/     ← tu página, ahora hecha con componentes de React.
│   └── src/App.jsx
├── README.md
└── CAMBIOS.md    ← qué cambió y por qué, explicado para ti.
En esta guía Y además
La idea: una mudanza, no una demolición ›
Elegir tu prompt: Directo o Guiado ›
Arrancar OpenCode en 5 pasos ›
Leer el informe de la Fase 0 ›
El mapa de las 7 fases ›
Cómo hablarle a OpenCode ›
Señales de alerta y red de seguridad ›
Errores comunes y checklist final ›
Jóvenes creaTIvos 2026 Migración a React con OpenCode
$ guia --bloque 1 // la idea
Es una mudanza, no una demolición Tu proyecto ya funciona. No lo vamos a tirar para hacerlo de cero: lo vamos a reorganizar y a
remodelar una parte.
🍳El backend es la cocina
Ya funciona: cocina los datos que
le pides. No se remodela, solo
cambia de cuarto (la carpeta backend/
).
🧱El frontend es la sala
Se remodela con piezas de LEGO
los componentes de React. Por
fuera debe verse y funcionar
igual que antes.
🚚OpenCode es la mudanza
Carga, mueve y arma. Pero solo
hace lo que dice la orden de
trabajo: el archivo 
.md
 con el
prompt.
Antes y después
ANTES (vanilla)
mi-proyecto/
├── index.html
├── css/estilos.css
├── js/app.js     ← querySelector,
│                   innerHTML...
├── img/
├── server.js     ← Express
├── package.json
└── .env
DESPUÉS (React)
mi-proyecto/
├── backend/
│   ├── src/server.js
│   ├── .env  +  .env.example
│   └── package.json
└── frontend/
    ├── public/img/
    └── src/
        ├── App.jsx
        ├── api.js     ← los fetch
        └── components/
👷 Tú eres el dueño de la casa
OpenCode trabaja, pero tú decides. Al final de cada fase revisas el cuarto, pruebas que todo funcione y
solo entonces escribes 
continúa
. Si nunca revisas, al final tendrás una casa que no conoces… y no
sabrás arreglarla cuando algo se rompa.
⚠ Lo que NO vamos a hacer
Pedirle “migra todo de una vezˮ. El prompt divide el trabajo en fases para que nada se salga de
control.
›
Cambiar el diseño, los textos, la base de datos o la lógica de tu backend. ›
Instalar librerías extra (axios, Redux, React Router, TypeScript…). Usamos lo que vimos en clase. ›
Jóvenes creaTIvos 2026 2
$ guia --bloque 2 // elige tu prompt
Dos órdenes de trabajo: elige una
Tu profe te compartió dos archivos 
.md
. Los dos llegan al mismo resultado; cambia quién escribe el
código.
MIGRACION_REACT_opencode.md
Modo Directo PROGRAMADOR
OpenCode escribe el código de cada fase y hace los
commits. Tú lees su explicación, pruebas en el
navegador, respondes la pregunta que te hace y
escribes 
continúa
.
Úsalo si… ya entiendes componentes y 
useState
 y
quieres el resultado completo para estudiarlo, o vas
atrasado con tu proyecto.
MIGRACION_REACT_GUIADA_opencode.md
Modo Guiado TUTOR
OpenCode hace lo mecánico (🤖: mover archivos,
configurar). Tú escribes lo que vimos en clase (🧑‍💻
JSX, props, 
.map
, 
useState
, 
useEffect
, fetch
) con objetivo, código base y pistas.
Úsalo si… quieres aprender haciendo, o React
todavía te cuesta. Es la opción recomendada.
Directo Guiado
¿Quién escribe los
componentes?
OpenCode Tú, con pistas
¿Quién hace los commits? OpenCode (nunca push) Tú OpenCode te sugiere el mensaje)
¿Qué haces al final de cada
fase?
Pruebas, respondes 1 pregunta, continúa Escribes, pides 
revisa
, corriges, continúa
¿Cómo retomas otro día? Con 
git log
 (ves qué fases
guardaste)
Con 
PROGRESO.md
 (casillas marcadas)
¿Cuánto aprendes? Lees y entiendes código ajeno Escribes y depuras tu propio código
🎮 Piénsalo como un videojuego
El modo Directo es ver a alguien pasarse el nivel mientras te explica cada movimiento. El modo Guiado
es jugarlo tú con un amigo al lado que te da pistas solo cuando las pides. Con el segundo cuesta más…
pero luego el nivel lo pasas solo.
🚫 Una sola orden por proyecto
No mezcles los dos archivos ni cambies de modo a mitad de camino. Si no sabes cuál elegir, empieza
con el Guiado: si te atascas, después de 3 pistas puedes pedir 
muéstrame la solución
.
Jóvenes creaTIvos 2026 3
$ guia --bloque 3 // antes de empezar
Checklist antes de abrir OpenCode Un mecánico no desarma el carro sin revisar que tiene las herramientas. Marca cada casilla antes de
empezar.
Revisa que… Cómo lo compruebo Listo si…
☐
 Tu proyecto vanilla funciona hoy Abre la página y el servidor Se ve bien y la API responde
☐
 Node.js 22 o más reciente
node -v
Sale 
v22…
 o mayor
☐
 Git instalado
git --version
Sale un número de versión
☐
 MongoDB local encendido Compass → mongodb://localhost:27017 Compass conecta y ves tu
base de datos
☐
 OpenCode instalado y con un modelo
configurado
opencode
Se abre la pantalla de chat
☐
 Tienes el archivo 
.md
 que elegiste Descargado en tu computador Lo puedes abrir y leer
🚪 ¿Qué es la “carpeta raízˮ?
Es la puerta principal de tu proyecto: la carpeta donde están juntos tu 
index.html
 y tu servidor
(
server.js
, 
package.json
…). OpenCode debe entrar por esa puerta; si lo abres en otra carpeta, no
encontrará tus archivos.
¿estoy en la raíz?
$ ls          # en Windows (cmd): dir
index.html  css/  js/  img/  server.js  package.json  .env
# ✔ Si ves tu HTML y tu servidor, estás en la raíz.
🛟 Tu versión vanilla queda a salvo
OpenCode trabaja en una rama nueva llamada migracion-react
. Tu rama principal no se toca. Si
el proyecto no era un repositorio, primero hace 
git
init
 y guarda una foto de cómo estaba.
🔑 Tu .env es una llave
No lo pegues en el chat ni lo subas a GitHub. El
prompt le prohíbe a OpenCode mostrarlo; si lo hace,
detenlo y avísale a tu profe.
⏱ Organiza tu tiempo
No intentes hacerlo todo en una sentada. Una buena meta es 1 o 2 fases por sesión de trabajo. Como
cada fase termina con un commit, siempre puedes parar y retomar al día siguiente sin perder nada.
Jóvenes creaTIvos 2026 4
$ guia --bloque 4 // arrancar
Arranca OpenCode en 5 pasos 1 Copia el prompt a la raíz de tu proyecto
Ponle un nombre corto y fácil de escribir. Queda junto a tus demás archivos:
mi-proyecto/
├── index.html
├── server.js
└── MIGRACION_REACT_GUIADA.md   ← o MIGRACION_REACT.md si elegiste el Directo
2 Abre la terminal en la raíz
$ cd ruta/a/mi-proyecto
$ ls     # ¿ves tu index.html, tu server.js y el .md? ¡Perfecto!
3 Abre OpenCode
$ opencode
4 Revisa que estés en modo Build
Abajo de la pantalla aparece el modo actual. Si dice Plan, presiona 
Tab
 hasta que diga Build. En
modo Plan OpenCode solo puede mirar: no crea ni mueve archivos.
5 Escribe el mensaje de arranque
Escribe 
@
 y empieza a teclear el nombre del archivo: OpenCode lo busca y lo adjunta. Luego envía:
Lee el archivo @MIGRACION_REACT_GUIADA.md y sigue sus instrucciones al pie de la letra. 
Empieza con la Fase 0.
💡 ¿Por qué un archivo y no pegar el texto en el chat?
Porque el archivo vive en tu proyecto. Si cierras OpenCode, se va la luz o la conversación se vuelve
muy larga, solo se lo vuelves a mostrar y sigue con las mismas reglas.
🔁 ¿Retomas otro día? Abre una conversación nueva y escribe: GUIADO
Lee @MIGRACION_REACT_GUIADA.md y @PROGRESO.md. Seguimos desde la primera tarea sin marcar.
DIRECTO
Lee @MIGRACION_REACT.md. Ya terminé hasta la Fase 3 (revisa git log). Sigue con la Fase 4.
Jóvenes creaTIvos 2026 5
$ guia --bloque 5 // fase 0
Fase 0: el plano antes de construir En la Fase 0 OpenCode no modifica nada (en el modo Guiado solo crea 
PROGRESO.md
). Revisa tu
proyecto y te entrega un informe. Léelo como un inspector de obra: si el plano está mal, la casa sale
mal.
Parte del informe Pregúntate…
Árbol de carpetas ¿Están todos mis archivos? ¿Falta alguna página, imagen o script?
Endpoints del backend ¿Coinciden con las rutas que hice en Express? (ej: 
GET /productos
, 
POST
/contacto
)
Los fetch del frontend ¿Encontró todos los lugares donde mi página llama a la API?
Componentes propuestos ¿Cada componente sale de una parte clara de mi HTML? ¿Tiene sentido cuáles llevan useState
?
Riesgos o dudas ¿Mencionó varias páginas HTML, login, Tailwind o algo que no entiendo?
Cómo responder al informe
✅ Si todo está bien:
Apruebo el plan. Continúa con la Fase 1.
✏ Si algo falta o sobra:
Antes de seguir: te faltó el endpoint POST 
/contacto y el buscador debe ir dentro de 
Catalogo. Corrige el plan.
❓ Si no entiendes algo:
No entiendo por qué propones que Header tenga useState. Explícamelo con un ejemplo de mi página.
🛑 ¿Tu página tiene varias páginas HTML?
(ej: 
index.html
, 
catalogo.html
, 
contacto.html
). El prompt le pide a OpenCode detenerse y
preguntarte, porque la navegación entre páginas en React se hace con React Router y eso lo vemos en
la Sesión 18. No inventes una solución: escríbele a tu profe antes de aprobar.
🧑‍💻 Solo en el modo Guiado: revisa PROGRESO.md
Ábrelo. Es tu lista de tareas con casillas 
[ ]
 y marcas 🤖 (lo hace OpenCode) y 🧑‍💻 (lo haces tú). Si
una tarea de clase quedó marcada como 🤖, pídele que la cambie: esa práctica es tuya.
Jóvenes creaTIvos 2026 6
$ guia --bloque 6 // el mapa
El mapa de las 7 fases Cada fase termina con un commit: es el punto de guardado del videojuego. Si algo se rompe
después, vuelves aquí.
Fase Qué pasa Listo si… Commit
0 Análisis OpenCode revisa y te entrega el
informe
Entiendes el informe y lo
aprobaste
—
1 Backend La API se muda a 
backend/
 y se
configura CORS para localhost:5173
npm run dev
 en 
backend/
 y
los GET responden en el
navegador
refactor: mover API a
carpeta backend
2 Vite Se crea 
frontend/
 con React; se
copian tu CSS y tus imágenes
localhost:5173
 abre con tus
estilos
chore: crear frontend con
Vite + React
3 Componentes Tu HTML se parte en componentes
JSX; las listas pasan a 
.map()
con datos de prueba
La página se ve igual (todavía sin
clics)
feat: componentes de la
página en React
4 useState Menú, filtros, carrito y formulario
funcionan con estado
Todo lo que hacía tu JS vuelve a
funcionar
feat: interactividad con
useState
5 API
api.js
 con 
fetch
 + useEffect
 con cargando y error
Los datos llegan de MongoDB, no
de 
src/data/
feat: frontend conectado
a la API
6 Cierre
.gitignore
, 
README.md
, CAMBIOS.md
npm run build
 y 
npm run
lint
 sin errores
docs: README y resumen de
la migración
El ritual al final de cada fase
1 Prueba. Abre el navegador o la terminal y
comprueba el “Listo si…ˮ de la tabla.
2 Lee la explicación de OpenCode. Si una
palabra no la entiendes, pregúntala.
3 Responde tú la pregunta de comprobación.
No le pidas la respuesta: ¡es para ti!
4 Guarda. Directo: revisa con 
git log --
oneline
. Guiado: haz tú el commit.
5 Escribe 
continúa
. Solo así pasa a la siguiente
fase.
🖥 Desde la Fase 2 necesitas dos terminales
terminal 1 · cocina
$ cd backend
$ npm run dev
terminal 2 · sala
$ cd frontend
$ npm run dev
Y MongoDB encendido. Si una de las dos está apagada, la página no tendrá datos.
Jóvenes creaTIvos 2026 7
$ guia --bloque 7 // cómo hablarle
Cómo hablarle a OpenCode
OpenCode no ve tu pantalla ni lee tu mente. Entre más claro le hables, mejor te ayuda.
Palabras clave 
Escribes
GUIADO
Qué hace OpenCode
pista
revisa
Te da la siguiente pista (solo una, de la más general a la más concreta).
error
muéstrame la
solución
continúa
Lee tu archivo, corre build y lint, y te dice qué hiciste bien y qué revisar con preguntas guía.
Le pegas el error. Primero te pregunta qué crees que dice y en qué archivo y línea está.
Solo después de las 3 pistas. Te la muestra en el chat y te pide que la escribas tú.
Pasa a la siguiente tarea o fase. También funciona en el modo Directo.
Cómo reportar un problema: el “parte médicoˮ
Un médico no puede ayudarte si solo le dices “me siento malˮ. Dale los síntomas:
Fase: ___   Qué hice: ___   Qué esperaba: ___   Qué pasó: ___
Error exacto (copiado de la terminal o de la consola F12): ___
Archivo y línea (si lo sé): ___
✗ Así no
no funciona arréglalo
hazlo todo de una vez
sáltate la fase 3
ponle axios que es más fácil
✓ Así sí
Fase 4. Al hacer clic en "Agregar" en 
ProductoCard, el contador del Header sigue en 
0. La consola no muestra errores. Creo que el 
problema está en cómo paso la función por 
props.
No entendí por qué el carrito vive en App.jsx 
y no en ProductoCard. Explícamelo con una 
analogía.
🧠 Truco: pídele que te enseñe, no solo que haga
Frases como “explícame esta líneaˮ, “¿qué pasaría si quito el 
[]
 del useEffect?ˮ o “compárame cómo
lo hacía en vanilla y cómo se hace en Reactˮ convierten a OpenCode en tu profe particular.
Jóvenes creaTIvos 2026
8
$ guia --bloque 8 // señales de alerta
🚩 Si ves esto, ¡para!
Los agentes de IA a veces se salen de las reglas. Tu trabajo es notarlo y frenarlo, como un árbitro.
Lo que ves Por qué es un problema Qué le escribes
Instala axios, Redux, React Router,
TypeScript u otra librería
El prompt solo permite React,
Vite y cors (y Tailwind si ya lo
usabas)
Para. Las reglas solo permiten react, vite y
cors. Desinstala axios y usa fetch.
Un componente usa querySelector
, 
innerHTML
o 
addEventListener
Eso es JavaScript vanilla, no
React
Ese componente usa querySelector. Reemplázalo
con useState y onClick como dicen las reglas.
Una lista con 
key={index}
La key debe ser el 
_id
 o id
 del dato
Usa el _id del producto como key, no el
índice.
Cambia la conexión a Atlas, el
nombre de la base de datos o los
modelos
Tu backend debe quedar
igual, con MongoDB local
No cambies la conexión. Sigue siendo MongoDB
local con la misma base de datos.
Cambia tus textos, colores o clases
CSS
La página debe verse igual
Mantén mis textos y mis clases CSS
exactamente como estaban.
Avanza varias fases sin esperar tu continúa Pierdes el control y no revisas
nada
Para. Volvamos al final de la Fase 2. Espera
mi "continúa".
GUIADO
 Escribe el código de
una tarea 🧑‍💻
Te quita la práctica
Esa tarea es mía. Deshaz el cambio y dame
solo el objetivo y el código base.
Muestra tu 
.env
 en el chat o
hace 
git push Rompe las reglas de
seguridad
Detenlo (
Esc
) y avísale a tu profe
🛟 Tu red de seguridad: Git
Gracias a los commits por fase, nunca pierdes más de una fase de trabajo. Estos comandos te dicen
qué pasó:
$ git status          # ¿qué archivos cambiaron desde el último commit?
$ git diff            # ¿qué líneas exactamente?
$ git log --oneline   # ¿qué fases ya guardé?
$ git restore .       # deshace los cambios SIN commit (no se pueden recuperar)
Ojo: 
git restore .
 no borra archivos nuevos. 
git status
 te los muestra en rojo como Untracked. Antes de
deshacer algo, pregúntate: ¿estoy seguro de que no hay nada aquí que quiera conservar?
Jóvenes creaTIvos 2026 9
$ guia --bloque 9 // si algo no funciona
Errores comunes Antes de pedirle ayuda a OpenCode, intenta ser tu propio detective: lee el error y hazte la pregunta
de la última columna.
Lo que ves Causa probable Pregúntate…
blocked by CORS policy
El backend no permite el origen localhost:5173 ¿En qué puerto corre mi frontend? ¿Ese origen
aparece en 
cors()
 de mi backend?
Failed to fetch
ERR_CONNECTION_REFUSED Backend apagado, o VITE_API_URL
 con otro
puerto
¿Tengo las dos terminales abiertas? ¿El puerto de VITE_API_URL
 es el de mi servidor?
VITE_API_URL
 sale 
undefined
El 
.env
 no está en frontend/
, no empieza con VITE_
, o no reiniciaste Vite
¿Dónde está mi 
.env
? ¿Reinicié 
npm run
dev
 después de crearlo?
MongooseServerSelectionError
ECONNREFUSED 127.0.0.1:27017 MongoDB local está apagado ¿Compass se conecta ahora mismo a localhost:27017
?
Missing script: "dev"
ENOENT package.json Corriste npm en la carpeta
equivocada
¿En qué carpeta estoy? ¿Esa carpeta tiene el package.json
 correcto?
Imágenes rotas La imagen no está en 
public/
o la ruta no empieza con 
/ ¿Mi imagen está en 
frontend/public/img/
?
¿La ruta es 
/img/...
?
Página en blanco Un error de JavaScript en un
componente
¿Qué dice la consola F12? ¿Qué archivo y línea
marca?
Each child in a list should
have a unique "key" prop
.map()
 sin 
key
 o con keys
repetidas
¿Qué dato de cada elemento es único? ¿Lo estoy
usando como 
key
?
Too many re-renders
Escribiste 
onClick={fn()}
en vez de pasar la función
¿Estoy ejecutando la función ya, o se la estoy
entregando a React para cuando haya clic?
'className' / 'htmlFor'
warnings Quedó 
class
 o 
for
 del
HTML viejo
¿Qué palabras del HTML cambian de nombre en
JSX?
🔍 La regla de los 10 minutos
Intenta resolverlo solo durante 10 minutos con las preguntas de la tabla. Si no sale, usa el “parte
médicoˮ de la página 8 para pedirle ayuda a OpenCode. Si OpenCode tampoco lo resuelve en dos
intentos, para y pregúntale a tu profe: no dejes que el agente dé vueltas cambiando cosas al azar.
Jóvenes creaTIvos 2026 10
$ guia --bloque 10 // entrega
Mi migración está lista si…
Revisa cada punto. Si alguno falla, vuelve a la fase que corresponde en el mapa.
Funciona Está ordenado y seguro
Y lo más importante: lo puedes explicar con tus palabras
📤 Cuando todo funcione, subes tú la rama
OpenCode nunca hace push. Ese paso es tuyo:
$ git push -u origin migracion-react
fin
$ exit
Hoy no solo migraste tu proyecto a React.
Aprendiste a dirigir a un agente de IA como lo hace un desarrollador profesional:
con un plan, por fases, revisando cada paso y sin perder el control de tu código. 
�
�
Hay dos carpetas: 
backend/
 y 
frontend/ ☐
Con dos terminales (
npm run dev
 en cada
carpeta) todo arranca
☐
La página en 
localhost:5173
 se ve igual
que la vanilla
☐
Menú, filtros, carrito y formulario funcionan
☐
Los datos llegan desde MongoDB, no desde src/data/
☐
npm run build
 y 
npm run lint
 sin errores
☐
El 
.env
 no aparece en 
git status
; sí
existe 
.env.example
☐
git log --oneline
 muestra un commit por
fase
☐
Existen 
README.md
 y 
CAMBIOS.md ☐
GUIADO
 
PROGRESO.md
 tiene todas las
casillas en 
[x]
 y escribiste “Lo que aprendíˮ
☐
Leíste los bugs que OpenCode anotó en CAMBIOS.md
☐
¿Qué es un componente y por qué es como una pieza de LEGO?
☐
¿Para qué sirve 
useState
 y qué pasaba antes con 
querySelector
?
☐
¿Por qué el 
useEffect
 que trae los datos lleva 
[]
?
☐
¿Por qué todos los 
fetch
 están en 
api.js
 y no regad