package router

import (
	"quiz-back/controllers/user"

	"github.com/gofiber/fiber/v2"
)

func UserRouter(app *fiber.App) {
	userR := app.Group("/api/users")

	userR.Get("/user/:id", user.GetUserById)
	userR.Post("/create", user.CreateUser)
	userR.Post("/login", user.LoginUser)
	userR.Get("/active", func(c *fiber.Ctx) error {
		activerUsers, _ := user.GetActiveUsers(c)
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "Ok",
			"data":    activerUsers,
		})
	})

	// Socket ro|ute

}
