venuesGenerator
=========

[![Build Status](https://travis-ci.org/remirobert/venuesGenerator.svg?branch=master)](https://travis-ci.org/remirobert/venuesGenerator)

A small library that generates random venues from Foorsquare.
Usefull to generate real fake data 😜.

## Installation

  `npm install @remirobert/venuesgenerator`

## Usage

    var venuesGenerator = require('@remirobert/venuesgenerator')(clientId, clientSecret);

```javascript
venuesGenerator.find({limit: 5})
.then(function(venues) {
})
.catch(function(err) {
  assert.fail(error);
});
```

Output should be:

```
{ name: 'Jack the Horse Tavern',
  location:
    { address: [Object],
      lat: 40.69993286239937,
      lng: -73.9936975351119,
      distance: 531 },
    rating: 8.7,
    contact: { phone: '(718) 722-7777' },
    categorie: 'Middle Eastern Restaurant',
    photos: [ 'https://irs1.4sqi.net/img/general/612x612/48623284_fqbPs5xy6jImyJu6U2w_xkkR7lilKCVfZEE8qSC66WU.jpg' ]
}
```

## Tests

  `npm test`

<img src=http://i.giphy.com/UHmT5qjH9NKVi.gif />

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
