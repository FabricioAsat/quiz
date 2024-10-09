package main

import (
	"os"
	"quiz-back/router"
	"quiz-back/utils"

	"github.com/gofiber/fiber/v2"
)

func main() {
	utils.DotEnvInit()
	PORT := os.Getenv("PORT")
	app := fiber.New()

	utils.GlobalMiddlewares(app)

	// Router
	router.UserRouter(app)

	app.Listen(PORT)
}
