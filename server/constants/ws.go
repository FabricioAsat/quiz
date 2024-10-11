package constants

import (
	"quiz-back/models"

	"github.com/gofiber/contrib/websocket"
)

var Clients = make(map[*websocket.Conn]bool) // Lista de conexiones WebSocket activas
var Broadcast = make(chan models.MUser)
