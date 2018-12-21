# Stupid Reload
This is just stupid.

## Description
Reloads the page every 0xfff milliseconds (~4 seconds) by default, 
if "live=true" string is presented in the hash url 
`````
http://example.com/index.html#live=true
`````
Could be turned off
if double-click somewhere on the page.
Hopefully will make it configurable, so you can change the event type
and probably some condition or arrow function as an option (for keyboard events),
or maybe just custom events like ```onKeyAPressed``` for example.


## Installation & Usage
### Warning! This section is not complete!
@todo: update this section with correct urls and package name!

To install cli tools and advanced stupid script use npm:
````
npm i stupid-reload --save-dev
````

Basically, if you don't need to change reload state 
(switch off and then turn it on back) you can use just one line:
````javascript
setTimeout(location.reload.bind(location, [true], 0xfff));
````
Or use a [bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet#Usage)
just press create new bookmark in the browser of your choice, and in the 
field "url" put this code:
````html
javascript:setTimeout(location.reload.bind(location, [true], 0xfff))
````
Or just drug [this link](javascript:setTimeout(p=>location.reload\(true\),0xfff))
to your bookmarks bar.

If it's not working, edit bookmark and make sure,
that url is started with __"javascript:"__ (don't miss the semicolon!)
at the very beginning.

If you need to change reload state by dblclick somewhere on the page 
(mobile works too), just put it somewhere in your __html__ file:
````html
<script src="node_modules/stupid-reload/index.js"></script>    
````
Then reload your page and dblclick somewhere. The url should change
from ```example.com/index.html``` to ```example.com/index.html#live=true```
and reloading each 4 seconds should start.

## ToDo:
* Upload to npm
* Read config not only from data-config JSON,
but also from the attributes like this:
````html
<script 
    data-enable-reload="true"
    type="text/javascript" 
    src="node_modules/stupid-reload/index.js">
</script>    
````
* Make node cli (should write script tag to itself into given file)
* Make index.html for github pages with this README.md content and 
a basic example.