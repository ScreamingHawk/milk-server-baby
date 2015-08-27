# milk-server-baby
Baby introduction website and fun services


## Features
* Pretty single page application to announce pregnancy / gender reveal
* Ability for users to suggest names for baby
* Ability for users to view names suggested by other users
* Ability for users to vote on names


## Usage
1. Create an AWS DynamoDB with table `baby-names` with Hash Key `name`
2. Create an AWS Lambda function for each `baby*.js` service
  * Note: `babyPing.js` is not required, but it is a simple service to attach to OPTIONS requests mentioned below
3. Create associated AWS API Gateway for accessing each service
4. [Ensure API Gateway allows for `OPTIONS` requests and has `Access-Control-Allow-Origin` headers](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html) to prevent CORS issues
5. Deploy API to stage
6. Correct links in `index.html` to the service locations
7. Create relevent css or use [ScreamingHawk/milk-server-static](https://github.com/ScreamingHawk/milk-server-static)
8. Update other information in `index.html` as appropriate
9. Upload to static file server (e.g. AWS S3)

## Credits
[Michael Standen](http://michael.standen.link)

This software is provided under the [MIT Licence](https://tldrlegal.com/license/mit-license) so it's free to use so long as you give me some credit. 

That being said, if you like the service you can [donate me a beer](https://www.changetip.com/tipme/michaelstanden). 
