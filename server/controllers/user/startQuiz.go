package user

import (
	"encoding/json"
	"quiz-back/constants"
	"quiz-back/models"
	"quiz-back/utils"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func StartQuiz(c *fiber.Ctx) error {
	var body struct {
		GameID  string   `json:"gameId"`
		Players []string `json:"players"` // Lista de IDs de los jugadores (A y B)
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	constants.Games[body.GameID] = body.Players

	var questions []models.MQuestion
	questions, err := utils.GetQuestions()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	for _, playerID := range body.Players {
		if conn, ok := constants.Clients[playerID]; ok {
			questionsJSON, err := json.Marshal(questions)
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": err.Error(),
				})
			}

			if err := conn.WriteMessage(websocket.TextMessage, questionsJSON); err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"error": err.Error(),
				})
			}

		}

	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ok",
		"data":    questions,
	})
}
