package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB(text string) (*mongo.Client, func()) {
	DDBB_URL := os.Getenv("MONGO_URL")

	client, err := mongo.Connect(context.TODO(), options.Client().
		ApplyURI(DDBB_URL))
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB")
	fmt.Println(text)

	disconnect := func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Fatal(err)
		}
		fmt.Println("Disconnected from MongoDB")
	}

	return client, disconnect
}
