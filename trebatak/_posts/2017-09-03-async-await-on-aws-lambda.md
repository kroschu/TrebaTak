---
layout: post
title: async/await on AWS Lambda
---

For my work at [Banff Cyber](https://www.banffcyber.com), I recently had to make use of AWS Lambda to run serverless functions on the fly. If you aren't familiar with AWS Lambda already, it basically allows you to run code without an actual server, hence the term _serverless_ functions. 

This makes sense for particular actions that are not going to be performed very often, but may require a large amount of RAM or computing power, and you do not wish to worry about the scalability of the action, since every separate invocation of the Lambda function does not degrade the performance of those already running, unlike running code within a single EC2 instance. 

On a side note, serverless architectures are gaining lots of traction, plus AWS Lambda allows you to run 1 million free requests and up to 3.2 million seconds of compute time per month on their free tier, which unlike other AWS services, this one does not expire. Other implementations include [OpenFaaS](https://www.openfaas.com/), which is kind of like a framework to deploy an entire application through a set of serverless functions, using Docker and Kubernetes. Check it out if you are interested, because I would (once I have the time)!

## AWS Lambda with Node.js

Anyway with the introduction aside, since my language of choice is JavaScript, I naturally chose the Node.js runtime for AWS Lambda. Your Lambda code is basically an exported function, which may look like this:

```js
exports.handler = function(event, context, callback) {
    // Get input as a string.
    const input = JSON.parse(event.input);

    // Perform some actions on the input.
    const sum = input[0] + input[1];

    // Handle any errors by throwing through the callback.
    if (sum < 0) {
        callback('Error: Sum cannot be negative! :(');
    }

    // Return the output through the callback.
    callback(null, sum);
};
```

The above is a simple Lambda function which, in the traditional sense of the word _function_, simply takes in an input and performs some processing which can then be piped out to another target.

## Using the AWS SDK

In my Lambda function, I used the [AWS SDK for JavaScript](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html), allowing you to manage your AWS services through code, much like how you may use the AWS CLI.

This meant that network requests had to be made, which means that performing multiple requests in succession may lead you to callback hell:

```js
const AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    const EC2 = new AWS.EC2();
    const S3 = new AWS.S3();

    // Get some info about all instances.
    EC2.describeInstances({}, (err, data) => {
        if (err) {
            callback(err.message);
        }

        data.Reservations.forEach(reservation => {
            reservation.Instances.forEach(instance => {
                // Create an S3 bucket.
                S3.createBucket({ Bucket: instanceId }, (err, data) => {
                    if (err) {
                        callback(err.message);
                    }

                    // Put an object in the new bucket.
                    S3.putObject({ Bucket: instanceId, Key: 'hello.txt', Body: 'hello world!' }, (err, data) => {
                        if (err) {
                            callback(err.message);
                        } else {
                            callback(null, 'Success!');
                        }
                    });
                });
            });
        });
    });
}
```

Look at that callback hell!! Look at all the repeated error handling!!

Thankfully, the SDK granted us the power of Promises, which is returned when chaining `.promise()` at the end of any SDK method call:

```js
const AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    const EC2 = new AWS.EC2();
    const S3 = new AWS.S3();

    // Get some info about all instances.
    EC2.describeInstances()
        .promise()
        .then(data => {
            const instanceIds = [];

            data.Reservations.forEach(reservation => {
                reservation.Instances.forEach(instance => {
                    instanceIds.push(instance.InstanceId);
                });
            });

            return instanceIds;
        })
        .then(instanceIds => {
            // Create a S3 bucket for each instance.
            const promises = instanceIds.map(instanceId => {
                return S3.createBucket({ Bucket: instanceId }).promise().then(() => instanceId);
            });

            return Promise.all(promises);
        })
        .then(buckets => {
            // Put an object in each S3 bucket.
            const promises = buckets.map(bucketId => {
                return S3.putObject({ Bucket: bucketId, Key: 'hello.txt', Body: 'Hello world!' }).promise();
            });

            return Promise.all(promises);
        })
        .then(() => {
            callback(null, 'Success!');
        })
        .catch(err => {
            console.log(err.message);
        });
};
```

Looks so much better, right? We have grouped each logical action into its own `.then()` callback, while throwing any errors encountered through the Promise chain to the end, using `.catch()`.

But we can do event better with the new ES2017 `async`/`await` syntax, which really shines when performing successive network calls such as this:

```js
const AWS = require('aws-sdk');

exports.handler = async function(event, context, callback) {
    const EC2 = new AWS.EC2();
    const S3 = new AWS.S3();

    try {
        // Get some info about all instances.
        const instancesData = await EC2.describeInstances().promise();

        // Get instance IDs.
        const instanceIds = [];
        instancesData.Reservations.forEach(reservation => {
            reservation.Instances.forEach(instance => {
                instanceIds.push(instance.InstanceId);
            });
        });

        // Iterate through each instance ID.
        for (instanceId of instanceIds) {
            // Create an S3 bucket.
            await S3.createBucket({ Bucket: instanceId }).promise();

            // Put an object into the newly created bucket.
            await S3.putObject({ Bucket: bucketId, Key: 'hello.txt', Body: 'Hello world!' }).promise();
        }

        callback(null, 'Success!');
    } catch (err) {
        callback(err.message);
    }
};
```

Look at it! It's amazingly neat and clear, and linearizes the entire callback chain. If this is new to you, I highly recommend using the `async` syntax whenever possible.

## ES2017 Features

However, the large caveat is that `async` (along with many other wonderful ES2016 and ES2017 features) isn't supported on AWS Lambda, according to [node.green](http://node.green/):

{% include image.html src="node-green-async.png" caption="No async/await? :((" %}

I knew that I had to use Babel to transpile the code from ES2017/ES8 to the ES2015/ES6 that Node.js 6.10 could understand, but most of my knowledge of Babel before this was only through stealing `.babelrc` files from boilerplates of previous projects.

## `es2017-lambda-boilerplate`

This prompted me to create [`es2017-lambda-boilerplate`](https://github.com/irvinlim/es2017-lambda-boilerplate), which provides many of the ES2016/ES2017 features we know and love to be used in AWS Lambda Node.js 6.10, including:

- [`async`/`await`](http://node.green/#ES2017-features-async-functions)
- [Object rest/spread properties](http://node.green/#ESNEXT-candidate--stage-3--object-rest-spread-properties)
- [Exponentiation operator (`**`)](http://node.green/#ES2016-features-exponentiation------operator)
- [`Array.prototype.includes`](http://node.green/#ES2016-features-Array-prototype-includes)
- [`Object.values`](http://node.green/#ES2017-features-Object-static-methods-Object-values)
- [`Object.entries`](http://node.green/#ES2017-features-Object-static-methods-Object-entries)

This was a really educational exercise for me, as I learnt a lot about the state of JavaScript's ECMAScript features, which ones made the cut for ES2015, ES2016 and ES2017, and also how to support older Node.js versions through a variety of Babel plugins and presets.

In trying to make the boilerplate as useful as possible to most people, I used the list available on the helpful [`node.green`](http://node.green/) website in order to pick out the most popular features which are not already available on Node.js 6.10.0, but available through Babel plugins.

The end result is a nice `.babelrc` file and `package.json` file for developing ES2017 Node.js AWS Lambda functions.

## Internet connectivity within Lambda

In addition, I was also bitten badly by the fact that placing a Lambda function in a VPC requires a NAT gateway in order for the Lambda function to have outbound Internet connectivity, and I was trying to use the bundled AWS SDK which required Internet access.

Because I assumed that putting the Lambda function in a VPC gave it access to the private network, I didn't think of going through the trouble of setting up a NAT gateway, and was stuck with the dreaded `Task timed out after 3.00 seconds` error without knowing why.

To prevent others from making similar mistakes like mine, I added a simple Internet connectivity test in the boilerplate which throws a helpful error message if it does not have Internet access:

```js
// Tests for Internet connectivity.
if (INTERNET_CONNECTIVITY_TEST) {
    const isConnected = await internetConnectivityTest();

    if (!isConnected) {
        const errorMessage =
            'No Internet connectivity from Lambda. ' +
            'If you do not require to use the AWS SDK or Internet connection, ' +
            'you may set INTERNET_CONNECTIVITY_TEST to false.';

        context.fail(errorMessage);
        return callback(errorMessage);
    }
}
```

## Conclusion

_TL;DR: The code for [`es2017-lambda-boilerplate`](https://github.com/irvinlim/es2017-lambda-boilerplate) can be found on GitHub! Do give it a star if it has helped you :)_

---

This has been a really educational experience on the whole, and I am glad to have learnt much more about various build tools I constantly take for granted, including NPM, Babel and Webpack.

I'll be experimenting more with serverless architecture in the meantime!
