package user

import (
	"quiz-back/database"
	"quiz-back/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/net/context"
)

func GetActiveUsers(c *fiber.Ctx) ([]models.MUser, error) {
	ctx, cancel := context.WithTimeout(c.Context(), 10*time.Second)
	db, disconnect := database.ConnectDB("get active users")
	defer cancel()
	defer disconnect()

	userCollection := database.GetCollection(db, "users")

	cursor, err := userCollection.Find(ctx, bson.M{"isActive": true})
	if err != nil {
		return nil, err
	}

	var activeUsers []models.MUser
	for cursor.Next(ctx) {
		var user models.MUser
		if err := cursor.Decode(&user); err != nil {
			return nil, err
		}
		activeUsers = append(activeUsers, user)
	}

	return activeUsers, nil
}
