# Thinking About Games: Essay Form

## Technologies
I used Formspree to send emails without a backend, and CKEditor to add  word-processing features to the textarea. CKEditor is an amazing tool that is very customizable - check it out! I added the AutoSave and WordCount plugins and removed a few of the included plugins of the full preset to make the customized editor you see in this project.

## TODO
presence verification
change value of button to Submit
- build email title string
- add maxWordCount
- check if autosave works in production site

## Questions/Decisions
Caching
replyto

## Features

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
