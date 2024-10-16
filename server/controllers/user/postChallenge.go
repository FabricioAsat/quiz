package user

import (
	"quiz-back/constants"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func PostChallenge(c *fiber.Ctx) error {
	var MPayload struct {
		FromUserID string `json:"fromUserID"`
		ToUserID   string `json:"toUserID"`
	}

	if err := c.BodyParser(&MPayload); err != nil {
		return err
	}

	// Buscar la conexión WebSocket del usuario al que se quiere retar
	toConn, exists := constants.Clients[string(MPayload.ToUserID)]

	if !exists {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	// Enviar el mensaje al usuario específico
	message := "CHALLENGE - User: " + MPayload.FromUserID + " wants to challenge."
	if err := toConn.WriteMessage(websocket.TextMessage, []byte(message)); err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Challenge sent",
	})

}
