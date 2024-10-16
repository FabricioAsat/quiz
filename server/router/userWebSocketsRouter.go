package router

import (
	"quiz-back/constants"
	"quiz-back/controllers/user/ws"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func UserWebSocketsRouter(app *fiber.App) {

	// Conexión WebSocket (ws request)
	app.Get("/ws/:id", websocket.New(ws.LoginMessageWs))

	//* |Goroutine| para enviar mensajes a todos los clientes
	go func() {
		for {
			user := <-constants.Broadcast
			for _, client := range constants.Clients {
				if err := client.WriteMessage(websocket.TextMessage, []byte(user)); err != nil {
					client.Close()
				}
			}
		}
	}()
}
