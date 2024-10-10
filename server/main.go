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

	// Middlewares
	utils.GlobalMiddlewares(app)

	// Router
	router.UserRouter(app)
	router.UserWebSocketsRouter(app)

	app.Listen(PORT)
}
