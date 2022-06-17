# DFM
A repository showing how I automated the process of account generation and answering numeracy on Dr Frost Maths. 

Note: This has been reported and was purely for testing purposes. I doubt this works any more.

## The process

- I started off with analysing the network requests sent through my browser using the Chrome developer tools network tab. I sent a request and analysed the response - 70 questions and answers (hashed) were sent back. After seeing that the answers were hashed in MD5, I knew there was a vulnerability.
- Using simple deduction I knew that I could just brute-force the MD5 (The numeracy contains numbers only up to 144), OR use a reversal database. Both work equally well in this case, but I used a reversal database. The tool I used for this was an npm module called reverse-md5. (https://www.npmjs.com/package/reverse-md5)  

With this knowledge I wrote a script that used only a cookie from the desired account which could then be created with the account generator I made using a temporary mail API. Using this it was possible to theoretically flood the leaderboards with thousands of botted accounts, awarding 200 points on each account it was possible to get a new school created to the top of the global leaderboards in a matter of minutes.

If you have any more questions about this, feel free to contact me. 
