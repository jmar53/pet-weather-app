# Pet Weather App

An application to determine if your pet needs an umbrella when going outside. Simply add your pet and its location and Pet Weather App will look up current weather conditions. If it's raining, your pet is going to need an umbrella!

## Local Setup For Development

To check weather conditions, AccuWeather APIs are used in this application. An AccuWeather API key is therefore needed. A key can be granted by creating an account at https://developer.accuweather.com/

Data for Pet Weather App is stored and retrieved from a seperate application - Pet Shelter API. Pet Shelter API needs to be running and a link to the location (eg. http://localhost:3000/pets) added to environment variables.

### Environment Variables
* AW_API_KEY - Key to AccuWeather APIs
* PET_API - Link to Pet Shelter APIs
