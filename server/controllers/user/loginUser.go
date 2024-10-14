package user

import (
	"quiz-back/constants"
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
	db, disconnect := database.ConnectDB("login")
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
			"error": err,
		})
	}

	//!: Incorporación - Busca a los activos y les avisa que el user se ha conectado
	// ! --------------------------------------------------------------
	cursor, err := userCollection.Find(ctx, bson.M{"isActive": true})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}
	var activeUsers []models.MUser
	if err = cursor.All(ctx, &activeUsers); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err,
		})
	}

	for range constants.Clients {
		constants.Broadcast <- backUser
	}
	// ! -------------------------------------------------------------

	backUser.Password = ""
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Ok",
		"data":    backUser,
	})
}
