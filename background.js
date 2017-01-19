/**
 * Created by nikoladrangovski on 1/18/17.
 */
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('LCD.html', {
        singleton: true,
        id: "My First Chrome Application"
    });
});
