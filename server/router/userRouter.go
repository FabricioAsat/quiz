package router

import (
	"quiz-back/controllers/user"

	"github.com/gofiber/fiber/v2"
)

func UserRouter(app *fiber.App) {
	userR := app.Group("/api/user")

	userR.Get("/:id", user.GetUserById)
	userR.Post("/create", user.CreateUser)
	userR.Post("/login", user.LoginUser)

	// Socket route

}
