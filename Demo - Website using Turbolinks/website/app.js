'use strict';

// This is called an immediately invoked function expression (IIFE), where we create a function and immediately execute it.
// Wrapping this piece of code in a function, makes it easier for us to make sure it's only run once.
// For example, we can't stop this script executing if `window.__turbolinks_started__` is false, outside of a function.

(function main() {

    // We only want to add add one event listener, so should only run the following once.
    if (window.__turbolinks_started__) {
        return;
    }

    Turbolinks.start();
    document.addEventListener('turbolinks:load', () => {

        console.log(`loaded ${window.location.pathname} via turbolink.`);
    });

    console.log('Turbolinks loaded.');

    // Set this to true we know this script has run, so as not to run it again.
    window.__turbolinks_started__ = true;

})();
