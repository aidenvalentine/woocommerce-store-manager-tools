# WooCommerce Management Tools

## AI-Powered Short Description Summarizer
So you have descriptions for all your products, but you need to create a few sentence summary for the WooCommerce "Short Description" field. No Problem!

Just start the server and HTTP POST the Wordpress IDs of the products you'd like to have a short summary (short description) created for. The AI NLP summarizer will generate a short "description field" based off your current (full) product description and save the new summary to the product.

### How it Works
1. Reads your WooCommerce product descriptions.
1. Summarizes the current description using an AI summarizer.

### Requirements
1. Generate WooCommerce Read/Write API keys for your different environments.
1. Sign up for an Algorithmia account, then create a new simple key in the "My API Keys" section.

### Usage
1. For each of your environments, replace the values in the `serverless-sample.env.yml` file located in the root of this project. Save the new file as `serverless.env.yml` in the root dir.
1. Open a cmd/bash console window in the root directory of this project.
1. Run command `$ npm install` to install node dependencies.
1. Run command `$ node app.js` to start the server on port 3000. `http://localhost:3000/`
1. Send an HTTP POST request with the Wordpress ID of the product as the body (see below).

An example JSON object containing the ID of a WooCommerce product to generate a short description for.

```json
{
  "id" : 123
}
```

### Reference - Environment Variable File
- WORDPRESS_URL = The base URL of your Wordpress instance.
- WC_CONSUMER_KEY = WooCommerce API Consumer Key.
- WC_CONSUMER_SECRET = WooCommerce API Consumer Secret.
- ALGO_CLIENT = Your Algorithmia API Key.
