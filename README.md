# My Next.js Application

This repository contains the backend code for my Next.js application. Due to storage limitations, the frontend code is not included in this repository.

## About the Application

The application is a recommendation system built with Next.js. It uses an API endpoint to fetch recommendations based on user input.

## How it Works

The main function `getRecommend` in `hyperclova.js` is responsible for fetching the recommendations. It takes a message from the assistant as an argument and sends a POST request to the API endpoint at `http://127.0.0.1:5000/api`.

The function constructs a `langPrompt` by concatenating a predefined location string with the assistant message. This `langPrompt` is then sent as JSON in the body of the POST request.

The API responds with a JSON object, which includes the assistant's response. This response is then returned by the `getRecommend` function.

## Setup and Usage

To use this application, you need to have the frontend code in a separate repository or directory. The frontend should call the `getRecommend` function with the assistant's message to get the recommendation.

Please note that the application is configured to work with an API running on `http://127.0.0.1:5000/api`. If your API is running on a different URL, you will need to update the `fetch` call in `getRecommend`.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the terms of the MIT license.

filter.js의 finetuning 된 gpt 3.5 turbo 모델을 통해 양질의 결과를 얻을 수 있도록 설계했습니다.
