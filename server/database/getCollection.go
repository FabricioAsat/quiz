package database

import "go.mongodb.org/mongo-driver/mongo"

func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	collection := client.Database("quiz").Collection(collectionName)
	return collection
}
