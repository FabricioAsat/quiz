package ws

import (
	"quiz-back/constants"

	"github.com/gofiber/contrib/websocket"
)

func LoginMessageWs(c *websocket.Conn) {
	defer func() {
		constants.Broadcast <- "LOGOUT "
		c.Close()
	}()

	constants.Clients[c] = true
	for {
		_, _, err := c.ReadMessage()
		if err != nil {
			delete(constants.Clients, c)
			break
		}
	}
}
