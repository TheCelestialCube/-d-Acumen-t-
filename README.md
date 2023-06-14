# **Forword**

## Project Description

Forword is a web-based application designed to analyze word usage in Google Docs. Using Google Apps Scripts, documents you've made are scanned to determine common words. Do be warned that this program can take upwards of half an hour to run if you have a large number of documents. The functional web version can be found [here](https://script.google.com/macros/s/AKfycbzFTdWEEfhHyvN7PzKAEVHwt3_otxVxjYx-WGaxuhlWgyQ9Sy5HLDz1Z8aAIULoOgG5Nw/exec). A warning may appear declaring the application as unsafe, and this is because the app has not been verified by Google.

## User Guide

The program is very straightforward to use. The three main inputs from the user are:
<img src="https://cdn.discordapp.com/attachments/765639151847997451/1118241665426137229/image.png" alt="A Diagram" width=700px style="margin: auto;"/>
1. Number of words to display. This is the number of rows which will be displayed in the table of commonly used words, with each row being a word.
2. Number of documents to scan and analyze. Due to the nature of querying Google Docs, it takes a long time to go through a large number of documents. If you want to scan through all of your documents, just enter a really large number.
3. Minimum word length. This is helpful if you don't just want "the", "a", "and" showing up a bunch of times, and want to see which longer and more meaningful words you use often.

After entering the desired inputs, just press "Submit" and patiently enjoy the loading animation while the data is collected.

## Implementation

This project is licensed under the [MIT License](https://en.wikipedia.org/wiki/MIT_License), which allows both commercial and private use, as well as modification and distribution. If you wish to implement this into your own project, consider the following options:

### Google Apps Scripts

1. Open the [Google Apps Scripts Dashboard](https://script.google.com/u/1/home/start)
2. Make a new project, or open an existing one
3. Make a javascript file and an html file called "Index.html"
4. Copy + Paste the code into the files

If you're having trouble deploying the project, read the documentation [here](https://developers.google.com/apps-script/concepts/deployments).

### Local Implementation with Clasp

See [this article](https://medium.com/geekculture/how-to-write-google-apps-script-code-locally-in-vs-code-and-deploy-it-with-clasp-9a4273e2d018) for help with setup. Then, follow steps 3 and 4 above.

## Improvements

There are still several features that could prove quite useful, including
- Scanning of a specific document URL
- Searching for specific (or a list of) words
- Filters on date of document so linguistic improvement over time can be tracked

Other than that, the program is quite slow, so it would be nice to make it run much faster. Alas, time is short, and we must continue to move Forword ;)

## Citations

Image for loading screen: kohycz. (n.d.). Sakayanagi wallpaper. WallpaperCave. Retrieved June 12, 2023, from https://wallpapercave.com/w/wp9728567. 


