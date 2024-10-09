package router

import (
	"quiz-back/controllers/user"

	"github.com/gofiber/fiber/v2"
)

func UserRouter(app *fiber.App) {

	app.Get("/:id", user.GetUserById)
	app.Post("/create", user.CreateUser)
	app.Post("/login", user.LoginUser)

}
