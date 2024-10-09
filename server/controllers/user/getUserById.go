package user

import (
	"context"
	"quiz-back/database"
	"quiz-back/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetUserById(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 10*time.Second)
	db, disconnect := database.ConnectDB()
	defer cancel()
	defer disconnect()

	var user models.MUser
	id := c.Params("id")
	objID, _ := primitive.ObjectIDFromHex(id)
	userCollection := database.GetCollection(db, "users")

	if err := userCollection.FindOne(ctx, bson.M{"_id": objID}).Decode(&user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}
	user.Password = ""
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ok",
		"user":    user,
	})
}
