# My Next.js Recommendation Application

Welcome to the repository for my Next.js-based recommendation system. This project is a sophisticated blend of backend functionality and web automation, designed to deliver precise and actionable recommendations. Due to storage limitations, the frontend code is hosted separately.

## 🚀 About the Project

At the heart of this application is a cutting-edge blend of technologies including a fine-tuned GPT-3.5 Turbo model within `filter.js`, and Selenium for web interactions. Although we initially aimed to integrate the naver HyperClovaX LLM model for a more personalized experience, restrictions led us to creatively adapt. We now employ ChatGPT with LangChain, for processing and generating recommendations. Selenium plays a crucial role in automating web interactions to gather restaurant titles and URLs, ensuring users have direct access to navigation options.

### How It Works

The recommendation engine, defined in `hyperclova.js`, follows a distinct process:

1. User queries are received and enriched with location data via the Naver Geolocation API.
2. A comprehensive `langPrompt` is generated, incorporating the user's request and location context.
3. The backend crafts a POST request to our API at `http://127.0.0.1:5000/api`, which is served by a fine-tuned ChatGPT model.
4. To compensate for the HyperClovaX model's unavailability, Selenium is used to scrape web data, ensuring rich and relevant recommendations.
5. The API's response includes curated recommendations, each with a restaurant title and URL for seamless user navigation.

## 🔧 Setup and Usage

To leverage this system:

- **Frontend Setup**: Ensure the frontend code is prepared in a separate repository or directory, as this backend is designed to integrate seamlessly with a frontend interface.
- **Selenium Configuration**: This project uses Selenium for web scraping. Make sure you have the Selenium WebDriver installed and configured to match your browser setup.
- **API Configuration**: The default API endpoint is `http://127.0.0.1:5000/api`. Adjust the endpoint in `getRecommend` as necessary to fit your environment.

## 🤝 Contributing

We welcome contributions of all forms, from feature enhancements to bug fixes, and even documentation improvements. Feel free to fork this repository, commit your changes, and submit a pull request. For discussions or to suggest changes, opening an issue is encouraged.


<img width="805" alt="스크린샷 2024-03-29 오후 10 40 56" src="https://github.com/YechanJung/first-/assets/127584126/60fe5f0a-f567-4cc0-bd9f-6ed87a6ccb00">

<img width="699" alt="스크린샷 2024-03-29 오후 10 45 46" src="https://github.com/YechanJung/first-/assets/127584126/abdf9e69-9549-49d0-b365-b7dc4dba5525">
