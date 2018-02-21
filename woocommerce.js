'use strict';

/**
 * Uses AI to generate short descriptions from the full description.
 * @method descriptionSummarizer
 * @param  {[type]}   event    [description]
 * @param  {[type]}   context  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
module.exports.descriptionSummarizer = (event, context, callback) => {
	const WooCommerceAPI = require('woocommerce-api'),
	      striptags = require("striptags"),
		    Algorithmia = require("algorithmia");

	/**
	 * Configure WooCommerce client.
	 * @type {WooCommerceAPI}
	 */
	const WooCommerce = new WooCommerceAPI({
	  url: process.env.WORDPRESS_URL,
	  consumerKey: process.env.WC_CONSUMER_KEY,
	  consumerSecret: process.env.WC_CONSUMER_SECRET,
	  wpAPI: true,
	  version: 'wc/v1'
	});

	/**
	 * Get the product data from WooCommerce.
	 * @type {Object}
	 */
	WooCommerce.getAsync(`products/${event.id}`)

	/**
	 * Returns the full product description.
	 * @type {Object}
	 */
	.then((result) => {
	  return JSON.parse(result.toJSON().body);
	})

	/**
	 * Removes HTML tags from the description (if applicable).
	 * @type {Object}
	 */
	.then((html) => {
	  return striptags(html.description);
	})

	.then((input) => {
		/**
		 * Connects to the AI NLP summarizer.
		 * @type {Object}
		 */
		Algorithmia.client(process.env.ALGO_CLIENT)
			.algo("nlp/Summarizer/0.1.6")
			.pipe(input)
			.then(function(response) {

				var data = {};
				data.short_description = response.get();

				// console.log(response.get()); // Debug
				// console.log(data); // Debug

				/**
				 * Save the product with the new short description.
				 */
				WooCommerce.put(`products/${event.id}`, data, function(err, data) {
					if (err) { callback(err); };
					var result = JSON.parse(data.toJSON().body);
					callback(null, result);
				});

			});

	})

};
