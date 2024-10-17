package user

import (
	"encoding/json"
	"quiz-back/constants"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

type results struct {
	Corrects int    
	Wrongs   int    
	Time     int     
	PlayerID string 
}

func PostResults(c *fiber.Ctx) error {
	var data struct {
		GameID   string 
		PlayerID string 
		Results  results
	}

	if err := c.BodyParser(&data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Enviar los resultados al oponente
	sendResultsToOpponent(data.GameID, data.PlayerID, data.Results)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ok",
	})
}

func sendResultsToOpponent(gameID string, playerID string, results results) {
	players := constants.Games[gameID]
	opponentID := ""

	// Identificar al oponente
	if players[0] == playerID {
		opponentID = players[1]
	} else {
		opponentID = players[0]
	}

	// Enviar los resultados al oponente
	if conn, ok := constants.Clients[opponentID]; ok {
		resultJSON, _ := json.Marshal(results)
		message := "RESULTS " + string(resultJSON)
		conn.WriteMessage(websocket.TextMessage, []byte(message))
	}
}
