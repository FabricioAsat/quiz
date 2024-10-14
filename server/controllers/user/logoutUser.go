package user

import (
	"context"
	"quiz-back/database"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func LogoutUser(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 10*time.Second)
	db, disconnect := database.ConnectDB("logout")
	defer cancel()
	defer disconnect()

	id := c.Params("id")
	objID, _ := primitive.ObjectIDFromHex(id)
	userCollection := database.GetCollection(db, "users")

	if err := userCollection.FindOneAndUpdate(ctx, bson.M{"_id": objID}, bson.M{"$set": bson.M{"isActive": false}}); err.Err() != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Err().Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ok",
		"data":    fiber.Map{},
	})
}
