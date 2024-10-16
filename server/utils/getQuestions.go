package utils

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"os"
	"quiz-back/models"
	"time"
)

func GetQuestions() ([]models.MQuestion, error) {
	var questions []models.MQuestion

	file, err := os.Open("questions.json")
	if err != nil {
		fmt.Println(err)
		return questions, err
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&questions)
	if err != nil {
		fmt.Println(err)
		return questions, err
	}

	//* Se encarga de mezclar y dar 10 preguntas aleatorias del json
	if len(questions) > 10 {
		r := rand.New(rand.NewSource(time.Now().UnixNano()))
		r.Shuffle(len(questions), func(i, j int) {
			questions[i], questions[j] = questions[j], questions[i]
		})
		questions = questions[:10]
	}

	return questions, nil
}
