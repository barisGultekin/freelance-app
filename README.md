# Odine Freelance Marketplace

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\

## Features

### 1. Dashboard Page
- Search for name
- Filter by location and number of jobs
- Filter by saved status

### 2. FreelancerCard Component
Each freelancer in the dasboard are represented by a card.
- Display Information:
    - Name, email, phone number and city
    - Completed job count
    - A profile picture (With the robohash placeholder API)
- Save Freelancer Action:
    - Redux to manage saved freelancers, updating the state with toggleSaveFreelancer
    - Persists changes in localStorage for consistency across sessions
- Hire Freelancer Action:
    - Opens a modal with a hire form

### 3. Portfolio Page
Each freelancer in the dasboard are represented by a card.
- Display information: Name, email, phone number, city and a profile picture
- Save freelancer and hire freelancer actions
- List of jobs
    - Show comment count for each post
    - Fetch and display comments for a certain post on demand

### 4. Hire Freelancer Modal
There are 2 components. A generic Modal component for possible future use cases and a HireForm component which is rendered inside the Modal in this case.
- Modal styling
- HireForm component

### 5. Mock API Integration w/ Axios
#### Key Functionalities
- Fetching Freelancers: Combines GET requests to /users for freelancer data and /posts to retrieve job counts and maps them to users.
- Fetching Freelancer Post: Retrieves all posts related to a specific freelancer using userId.
- Fetching Comments for a Post: Fetches comments for a specific post dynamically.
- Fetching Comment Count: Fetches comments for all posts of a freelancer in parallel using Promise.all and maps the comment count to the respective post.

#### Api Response Handling
- Success: Updates the Redux store with fetched data (e.g., freelancers, posts, or comments).
- Failure: Updates the store status to failed.

### 6. State Management w/ Redux
#### Freelancer List Management (freelancerListSlice):
- createAsyncThunk to fetch user and post data from a mock API. Combines results to compute job counts for freelancers.
- Saving Freelancers:
    - Implements toggleSaveFreelancer to add/remove freelancers to a saved list.
    - Persists saved data using localStorage for session consistency.

#### Freelancer Details Management (freelancerDetailSlice):
- Data Fetching:
    - Fetches detailed user info, posts, and comments using separate createAsyncThunk actions.
	- Tracks comment counts and dynamically loads comments for individual posts.
- Tracks loading states for posts and comments to give users feedback during async operations.

#### Theme Management (themeSlice):
- toggleTheme action toggles between themes and persists the selection in localStorage.

### 7. Light/Dark Mode
The app supports light and dark modes using a Redux themeSlice. The theme state is managed globally, saved to localStorage for persistence, and applied dynamically through a ThemeProvider.

### 8. Responsive Design
The app is fully responsive, designed with a mobile-first approach in Figma, but coded with a desktop-first implementation. Media queries were minimized to maintain simplicity and focus on the user experience.

### 9. Testing w/ Jest
Testing was implemented using Jest. Only one test for the themeSlice was completed. The issue there is elaborated at the "Known Issues and Future Work" section.

## Project Structure

### src/components/
This folder contains reusable UI components used across the application.
- ContactInfoRow: Displays contact information in the portfolio.
- FilterPanel: Used in the Dashboard for filtering freelancers based on search criteria.
- FreelancerCard: Represents individual freelancer details as a card with options for saving and hiring.
- HireForm: A form to handle the freelancer hiring process.
- Modal: A reusable modal component for displaying content in overlays.
- Navbar: Navigation bar component for the application.
- PostCard: Represents individual posts in the portfolio.

### src/pages/
This folder contains the main pages of the application.
- DashboardPage: The main page where users can search and filter freelancers.
- PortfolioPage: Displays detailed information about a freelancer, including their posts and comments.

### src/redux/
This folder contains Redux slices and store configuration.
- freelancerListSlice: Manages the state of the freelancer list, including fetching data and saving freelancers.
- freelancerDetailSlice: Manages the state of individual freelancer details, including posts and comments.
- themeSlice: Manages the theme state (light/dark mode) of the application.


## Known Issues and Future Work
### Jest Configuration Issue
While implementing tests Redux slices relying on axios for API calls, this error recurred:

Cannot use import statement outside a module. 

This issue likely originates from a compatibility gap between Jest and ES Modules (import), specifically within node_modules packages like axios. Create React App’s (CRA) default Jest configuration has limitations in handling modern JavaScript modules, which may require additional transformations or overrides.

Due to this persistent issue, testing for Redux slices that depend on asynchronous API calls (fetchFreelancers, fetchFreelancerById, etc.) was postponed.

Resolving this issue requires investigating how Jest processes ES Modules in the current CRA setup. Potential approaches include:
- Adjusting Jest’s transformIgnorePatterns to include necessary modules (e.g., axios) for transformation.
- Exploring Babel or other transformers that can handle ES Modules within node_modules.
- Referencing existing community solutions and issues (e.g., CRA issues related to Jest and ES Modules) to guide a tailored resolution.

This issue is tracked under [#1: Jest Config Issue](https://github.com/barisGultekin/freelance-app/issues/1), which documents the details of the problem and potential solutions.

## Screenshots
