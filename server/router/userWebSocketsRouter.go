package router

import (
	"quiz-back/constants"
	"quiz-back/controllers/user/ws"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func UserWebSocketsRouter(app *fiber.App) {

	app.Get("/ws", websocket.New(ws.LoginMessageWs))

	//* |Goroutine| para enviar mensajes a todos los clientes
	go func() {
		for {
			user := <-constants.Broadcast
			for client := range constants.Clients {
				err := client.WriteMessage(websocket.TextMessage, []byte(user.Username+" has conected"))
				if err != nil {
					client.Close()
					delete(constants.Clients, client)
				}
			}
		}
	}()
}
