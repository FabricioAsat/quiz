package constants

import "github.com/gofiber/contrib/websocket"

var Clients = make(map[string]*websocket.Conn) // Lista de conexiones WebSocket activas
var Broadcast = make(chan string)
