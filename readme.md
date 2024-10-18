# 🎮 Trivia Online Multijugador

¡Bienvenidos a mi proyecto de Trivia Online! Un quiz multijugador donde dos personas compiten en tiempo real respondiendo preguntas.

## 🚀 Características principales

- Backend desarrollado con GoFiber.
- Frontend construido en ReactJS.
- MongoDB como base de datos.
- Comunicación en tiempo real utilizando WebSockets.
- Mismas preguntas para ambos jugadores durante la partida.
- Envío de resultados: número de respuestas correctas, incorrectas y el tiempo tomado.

## ⚙️ Tecnologías utilizadas

- GoFiber para el backend 🛠️
- ReactJS para el frontend ⚛️
- MongoDB para la persistencia de datos 📊
- WebSockets para la comunicación en tiempo real 📡

## 👥 Funcionamiento

Dos jugadores se conectan, reciben las mismas preguntas, y al finalizar el quiz, ambos pueden ver los resultados del otro (respuestas correctas, incorrectas y tiempo). 

Mira el video a continuación para ver una demostración rápida de la creación de usuarios, inicio de sesión y una partida en acción:

## 📜 Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/tuusuario/tu-repo.git
```

1. Clona este repositorio:

```bash
cd server
go mod tidy
cd ../client
npm install
```

1. Configura tu base de datos MongoDB y ajusta las variables de entorno.
2. Ejecuta la aplicación:
    - Backend: `go run main.go`
    - Frontend: `npm run dev`
3. Abre tu navegador y disfruta de la trivia online. 🚀