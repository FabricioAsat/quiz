package user

import (
	"quiz-back/database"
	"quiz-back/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/net/context"
)

func LoginUser(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(c.Context(), 10*time.Second)
	db, disconnect := database.ConnectDB()
	defer cancel()
	defer disconnect()

	var backUser, frontUser models.MUser

	if err := c.BodyParser(&frontUser); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	userCollection := database.GetCollection(db, "users")

	if err := userCollection.FindOne(ctx, bson.M{"email": frontUser.Email}).Decode(&backUser); err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "This email does not exist",
		})
	}

	if bcrypt.CompareHashAndPassword([]byte(backUser.Password), []byte(frontUser.Password)) != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid password",
		})
	}

	if err := userCollection.FindOneAndUpdate(ctx, bson.M{"_id": backUser.ID}, bson.M{"$set": bson.M{"isActive": true}}).Decode(&backUser); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal server error",
		})
	}

	backUser.Password = ""
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ok",
		"data":    backUser,
	})
}
