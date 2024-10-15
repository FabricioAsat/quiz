package constants

import (
	"github.com/gofiber/contrib/websocket"
)

var Clients = make(map[*websocket.Conn]bool) // Lista de conexiones WebSocket activas
var Broadcast = make(chan string)
