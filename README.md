# Thinking About Games: Essay Form

## Technologies
I used Formspree to send emails without a backend, and CKEditor to add  word-processing features to the textarea. CKEditor is an amazing tool that is very customizable - check it out! The biggest downside is that the documentation is hard to pick through; I didn't end up using it much. I added the WordCount plugin and removed a few of the included plugins of the full preset to make the customized editor you see in this project. I attempted to use the Autosave plugin as well, but I could not get it to work. But, I was able to implement autosave myself using HTML5's localStorage!

## TODO
- add meta tag for mobile
- change font
- style button and error/save
- add favicon
- implement spinner
- test in subway
- test in all browsers
- test quitting out of browser
- refactor!

## TODO at meetup
- set up domain with heroku
- confirm email address with formspree
- 4 p's w title or title + 3 p's? correct error msg too if 3 p's

## What students will want to know
- If they reply to their own message, they will be replying to themselves! This is just a quirk of using the same cc email as the reply_to email. But, if you are the one sending the message, the recipient will be as expected since the reply_to email was designated for your point of view.
- They can probably use this on the subway! HTML5 woot! Just tell them to make sure to only submit when they have signal again.
- Autosave is on the browser, not across devices.

## Features

## Testing Formspree
I realized that Formspree would not work if I tried to submit the form locally. I created a gh-pages branch and pushed to the corresponding remote (which I named Test, which I will now use for testing future projects that require a real domain) to test Formspree.

## HTML5 Storage
An amazing feature of HTML5 that allows the user to effectively save data onto the browser. No backend required! It even works if you quit out of the browser, as long as you use localStorage instead of sessionStorage. This was a valuable example for me: https://github.com/mdn/web-storage-demo/blob/gh-pages/main.js
And the autosave plugin code was useful too: https://github.com/w8tcha/CKEditor-AutoSave-Plugin/blob/master/autosave/plugin.js

## Configuring CKEditor
I only had to do a few general configs. One was the height of the editor, which I gave 500. The other very important general config was for tab spacing. Without it, the tab key tabs to the next input. Make sure you have the tab plugin for the config to work. The last config code was to remove plugins that I didn't end up using. This was my config code that I put at the bottom of CKEditor's config.js:

```
config.height = 500;
config.tabSpaces = 12;
config.removePlugins = 'autosave,save';
```

## Configuring the WordCount plugin
I went into the ckeditor.js file and set maxWordCount to 300 and hardLimit to false to prevent the editor from preventing you to type more than 300 words (if you did this using the minified version, change the 0 to a 1). I also changed the < to a <= when checking for the word and char count limits in the else if statement, so that the limitRestored event would fire when the wordCount was equal to the maxWordCount. Otherwise, if the user types above the limit and then deletes until they reach the limit, the wordCount will still show up red. I did not bother with changing the wordCount display to green when the wordCount exactly matched the limit, since the display contains the paragraph count as well. A green, incorrect paragraph count could confuse users.

Since I could not find a way to get the paragraph count in the API documentation or plugin documentation, I had to manually do this in a script. There is at least a way to get the html content of the replaced textarea, which is ```<editor instance>.getData()```. With this, I just wrapped the string in a div in order to use ```find()```. The result looks like this:
```
$('<div>' + essayHTML + '</div>').find("p").length
```

## Using a downloaded font
1. Download the font you want into your project
2. Convert the ttf file to eof in order for your font to be compatible with IE and insert that into the same folder as the original. This is a free tool to do that: https://www.kirsle.net/wizards/ttf2eot.cgi
3. Insert this CSS at the top
```
@font-face {
 font-family: anyname;
 src: url("path/file.eot");
}
@font-face {
 font-family: anyname;
 src: url("path/file.ttf");
}
```
4. Set ``` font-family: "anyname" ``` on the desired elements!

## Errors
There is an error that pops up in the Chrome console when you do not fill out all of the required input fields. It looks like this:
```
An invalid form control with name='' is not focusable.
```
I was able to figure out that this is due to the ```<input required>``` fields not being direct children of the ```<form>```. Luckily, these errors do not affect the functionality of this application.
