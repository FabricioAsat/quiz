package constants

import "github.com/gofiber/contrib/websocket"

var Clients = make(map[string]*websocket.Conn) // Lista de conexiones WebSocket activas
var Games = make(map[string][]string)          // Lista de partidas
var Broadcast = make(chan string)
