## Setup

git clone this repo and ```yarn```to install the dependencies.

### Endpoints

The endpoint for saga/thunk (used by redux to fetch the API) are in ```src/bedder/bedderConfig.js``` and ```src/bedder/bedderSetting.js```. Please make sure you query to live endpoint, and not the local. The endpoints for the GraphQL server can be found in ```src/utils/createClient.js```. If you're not using the local graphql endpoint, you should change the ```endpoint```for the live one.

### GraphQL and Redux

This project was started using Redux and Saga. Then, Thunk was added to all this. To simplify the code, we started implementing an Apollo Client and an Apollo server in some components. From now on, we shall use the Apollo Client to query our backend, and not Saga or Thunk.

The Redux implementation works, but is clunky and doesn't follow best practices. If you have time to rewrite some components, feel free to do so, but be careful. The reducers and sagas are injected dynamically in components.

### Routing and loading

This project loads components dynamically, using ```react-loadable```. It also uses ```react-router```.

### Containers and Components

Please note the the containers should be used for views only. It is not the case currently. If you have time to rewrite, please do it.

The components should be as reusable as possible. It is not the case currently (i.e "SearchBar", "SearchBarMobile" and "SearchBarMobileCompact"). If you have time to rewrite, please do it.

### Admin

I wrote a basic admin system for secure database access. The static content (for example "Terms and conditions" page) is managed through NetlifyCMS.

### TODO

- Load all reviews for a business on "See more reviews" click (see the page "Reviews" in the XD, can be simplified).
- Test and improve the Sign In and Sign Up process with all the appropriate feedback.
- Style the search map according to the design. You can use the same style than the BusinessEdit view ```src/containers/BusinessEdit/BusinessEditGeneralInformation/Map/mapStyle.js```. Make search relaunch possible from the map (especially from mobile).
- Mobile Business Tile on the search map

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
