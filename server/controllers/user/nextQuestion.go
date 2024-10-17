package user

import (
	"quiz-back/constants"
	"strconv"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func NextQuestion(c *fiber.Ctx) error {
	var body struct {
		GameID        string `json:"gameId"`
		PlayerID      string `json:"playerId"`
		QuestionIndex int    `json:"questionIndex"` // Índice de la pregunta actual
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	sendProgressToOpponent(body.GameID, body.PlayerID, body.QuestionIndex)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ok",
	})
}

func sendProgressToOpponent(gameID string, playerID string, questionIndex int) {
	players := constants.Games[gameID]
	opponentID := ""

	// Identificar al oponente
	if players[0] == playerID {
		opponentID = players[1]
	} else {
		opponentID = players[0]
	}

	// Enviar el mensaje de progreso al oponente
	if conn, ok := constants.Clients[opponentID]; ok {
		message := "PROGRESS " + strconv.Itoa(questionIndex)
		conn.WriteMessage(websocket.TextMessage, []byte(message))
	}
}
