package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type MUser struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Username string             `bson:"username" validate:"required" min:"1" max:"40"`
	Email    string             `bson:"email" validate:"required,email" min:"6" max:"100"`
	Password string             `bson:"password" validate:"required" min:"6" max:"64"`
	IsActive bool               `bson:"isActive"`
}
