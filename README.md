# World Cities Management

A React application for managing cities and countries. This project allows users to view, add, edit, and delete cities and countries. It uses a REST API for data operations and React Router for navigation.
API:https://github.com/SayedImtiaj/WorldCitiesAPI.git
## Features

- **City Management:** Add, edit, and delete cities. View cities with associated countries.
- **Country Management:** Add, edit, and delete countries. View countries with the total number of cities.
- **Routing:** Navigate between cities and countries pages using React Router.
- **Forms:** Use forms to add and edit cities and countries.

## Project Structure

- **`src/Components/CityListComponent.tsx`**: Manages and displays a list of cities.
- **`src/Components/CountryListComponent.tsx`**: Manages and displays a list of countries.
- **`src/App.tsx`**: Main application component that sets up routing.
- **`src/Services/CityService.ts`**: API service for cities.
- **`src/Services/CountryService.ts`**: API service for countries.
- **`src/models/City.ts`**: TypeScript model for city data.
- **`src/models/Country.ts`**: TypeScript model for country data.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/world-cities-management.git
   cd world-cities-management
