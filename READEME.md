## Vending-API
- Built vending machine app using API where users can choose their favor food and beverage items integrated with Edamam's API
<br/>
<img src="vending.jpg" height="90" width="100">
<br/>

### Features:
- Edit, review and choose item on user interface
- User can search more nutrient fact for a specific item
- User can post a review for food item.
- User can see many random items on the healthy brand food recommendation.

### Set up
- Git clone repository
- Set up .env base on `.env.example`
- Run `yarn install`
- Run `createdb vending-api_development`
- Run `cd server`
- Run `yarn migrate:latest`
- Run `yarn db:seed`
- Navigate to app root directory. Run `yarn run dev`
- Go to`localhost:3000` i a browser to see the app

### Author
William Vo

### Techniques used:
- Front end: React JS, Saas, HTML, SCSS.
- Back end: Node JS, Express, Objection.
- Database: SQL
- Testing: Cypress