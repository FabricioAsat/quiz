package user

import (
	"quiz-back/constants"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func PostChallengeResponse(c *fiber.Ctx) error {
	var responsePayload struct {
		FromUserID string `json:"fromUserId"` // Quien envió el reto
		ToUserID   string `json:"toUserId"`   // Quien responde el reto
		Accepted   bool   `json:"accepted"`   // Si acepta o no
	}

	if err := c.BodyParser(&responsePayload); err != nil {
		return err
	}

	// Buscar la conexión del usuario que envió el reto (retador)
	fromConn, existsFrom := constants.Clients[responsePayload.FromUserID]
	toConn, existsTo := constants.Clients[responsePayload.ToUserID]
	if !existsFrom || !existsTo {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	// Enviar la respuesta al retador
	var responseMessage string
	if responsePayload.Accepted {
		responseMessage = "ACCEPT"
	} else {
		responseMessage = "REJECT"
	}

	if err := fromConn.WriteMessage(websocket.TextMessage, []byte(responseMessage)); err != nil {
		return err
	}
	if err := toConn.WriteMessage(websocket.TextMessage, []byte(responseMessage)); err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ok",
	})
}
