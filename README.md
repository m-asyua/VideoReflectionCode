# VideoReflectionCode
Video reflection tool for coding on the web

(Under construction)

![record_demo](https://user-images.githubusercontent.com/83494645/116784336-b4e7b100-aace-11eb-8bfa-081c1d0904ca.gif)

## Overview
This tool records a program making canvas on a web page and consequent error messages for a specific duration. Users can review their programs and consequent errors on a web page. Most users do not remember the cause of error messages. This will be a useful tool for beginners learning to code. The recorded video can be played at double or faster speeds for quicker review, and once recorded, the video is immediately available for download.

## Caution
-	Primrose (https://github.com/capnmidnight/Primrose) is used as an editor on a web page canvas. Therefore, users must download Primrose.
-	An online compiler function is not included, and is therefore required prior to connecting the tool. Inaccurate implementation and incorrect use of the online compiler may lead to security lapses. Users are advised to familiarize themselves with any potential security risks before using this tool. Online-Compiler (https://github.com/shawon100/Online-Compiler) was used in our demo video.

## About the code
The sample page records the program editing behavior. The "index.js" code in Primrose was used to create this sample. As connecting an online compiler from this sample may result in security lapses, careful implementation is recommended in vulnerable networks.

## How to execute
-	Prepare apache and PHP (xampp is a good choice)
-	Download Primrose. Please ensure that index.html can be used in Primrose, through a web browser. 
     For example, access ` http://localhost/(primorose directory)/index.html ` and look for the Primrose demo page.
-	Copy the record_test.js, record_test.php, and record_test.txt files to the Primrose directory.
-	Access ` http://localhost/(primorose directory)/record_test.php ` and look for our demo recording.
-	Set the recording time using the following parameters after adding the .php file name. 

### For example,
```
http://localhost/(primorose directory)/record_test.php?timer=60000&autostart=1
```
```
timer=60000   length of time (milliseconds)

autostart=1    enable autostart
```

The recording will begin automatically at the final minute if the above parameters (timer=60000 and autostart=1) are set.

## About the customizations

### For example,
```
var get_url= your_site_url+"?code="+code+"&input="+input;
```
- The parameters should be customized to fit your online compiler.
- This tool should be used carefully outside a localhost. 
- The tool is designed to send code and receive the executed or compiled output. The sample code employs Ajax to send and receive data.

## Additional comment

If you get an error on `primrose.js:603` in console.log, you may be able to fix it by modifying the following in primrose.js. (This is a temporary solution. Please find a perfect way.)

`
primrose.js:603:21 Uncaught TypeError: row.tokens[(row.tokens.length - 1)] is undefined
`

`
primrose.js:603 Uncaught TypeError: Cannot read property 'type' of undefined
`

```
603:                if (row.tokens[row.tokens.length - 1].type === "newlines") {
604:                    ++currentLineNumber;
605:                }
```

```
603:                if(row.tokens.length - 1>=0){
604:                    if (row.tokens[row.tokens.length - 1].type === "newlines") {
605:                        ++currentLineNumber;
606:                    }
607:                }
```                  
