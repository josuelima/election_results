Election Results
================

This is a pet project I made to play with Node.js and Websockets.

It's composed by two modules: 
- Server: Registers the candidates and the votes, and broadcasts the information to the subscribers via websockets
- Client: Send register requests for candidates and votes to the server, and subscribe to the publisher to receive updates

The goal is to update all the client subscribers whenever a new vote is registered at the server, making it a real time application.

## Built with
- [Node.js](http://nodejs.org/)
- [Express](http://expressjs.com)
- [Redis](http://redis.io)
- [Socket.io](socket.io)
- [Axon](https://github.com/tj/axon), a cool message oriented socket library

## Server
All API methods receives and returns JSON

Method | Path         | Params        | Description                     | Returns
-------|--------------|---------------|---------------------------------|-----------
GET    | /candidates  |               | List registered candidates      |[{name, tag, img_url}]
POST   | /candidates  | name, img_url | Register a new candidate        |
GET    | /votes       |               | List candidates total votes     |[{tag}]
POST   | /votes       | candidate_tag | Register a vote for a candidate |

img_url: URL to the candidate photo, tag: Candidate name parameterized

After registering a candidate or a vote, the server broadcasts the registers to the subscribers.

## Client

The client main page lists the candidates and votes. It subscribes to the publisher socket and when a new candidate or vote is registered the interface is automatically update without refresh.

![home](http://s18.postimg.org/crdlcngnd/home.png)

The dashboard page also lists the candidates and votes, but has options to register new candidates and add votes.

![dashboard](http://s28.postimg.org/76ugesail/dash.png)



