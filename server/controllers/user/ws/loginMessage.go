package ws

import (
	"quiz-back/constants"

	"github.com/gofiber/contrib/websocket"
)

func LoginMessageWs(c *websocket.Conn) {
	userID := c.Params("id")
	constants.Clients[userID] = c

	for {
		_, _, err := c.ReadMessage()
		if err != nil {
			break
		}
	}

	defer func() {
		constants.Broadcast <- "LOGOUT "
		delete(constants.Clients, userID)
		c.Close()
	}()
}
