# To do List Smart Contract with solidity and truffle  
##### To do smart contract along with the front end for the user to add the task, complete and remove complete task from the list. I have used basic html and js frontend along with the bootstrap for basic styling. I have added test cases for each and every smart contract written in the project.
## Installation

Truffle requires [Node.js](https://nodejs.org/)

Install the Truffle dependancy globally 

```sh
npm install -g truffle
```

You can learn more about the truffle on the following link 

Truffle Quik Reference : [Truffle](https://trufflesuite.com/)

Truffle Documentation : [Docs](https://trufflesuite.com/docs/truffle/quickstart.html)


## Ganache Installation 

Ganache is the Local blockchain environment which will create local environmant of the blockchain into your system. It will be much easier for you to write and run test your smart contracts locally. 

To Download Ganache GUI [Click Here](https://trufflesuite.com/ganache/)

Additionaly you can install the Ganache using package manager:

Using NPM
```sh
npm install -g ganache-cli
```

Using Yarn 
```sh
yarn global add ganache-cli
```
Additionaly you refer [Ganache Documentation](https://trufflesuite.com/docs/ganache/) for further read.
## Setup Metamask 
To use the blockchain, you need to install distributed application (dApp) browser. One of the most popular dApp browsers is known as Metamask. Follow the first set of instructions to install it on the Chrome browser, and then read on to start unlocking the power of the blockchain!

Installing the metamask

Step 1. Go to the [Metamask website](https://metamask.io/).<br />
Step 2. Click “Get Chrome Extension” to install Metamask\n.<br />
Step 3. Click “Add to Chrome” in the upper right.<br />
Step 4. Click “Add Extension” to complete the installation.<br />

Setup Metamask 

For setting up your metamask you can have check [this article](https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047) written by Patrick Long. This will give nice idea about how to configure and use metamask.

Additionaly you can visit [Metamask Documentation](https://docs.metamask.io/) for further read.
#### Let's Dive into the setup 

Create Project Directory 

```sh
mkdir eth-do-list // give whatever directory name you like
cd eth-do-list
```

Create empty truffle project 

```sh 
truffle init
```
## Directory Structure

| Directory| Description|
| --------------------- | :-------------------------------------------------------------: |
|/build/contracts| directory created after the truffle compile|
|/contracts| Directory in which smart contract files are stored|
|/migrations| Migrations files to move the smart contracts to the blockchain. |
|/src| Front-end files to render the ui|
|/test| Smart contract test files|
|/.gitignore| gitignore files to be excluded from the git|
|/bs-config.json| config file for frontend|
|/package.json| Dependancies file for the project|
|/trufle-config.json| Truffle config file|  

And here we have setuped our To Do List project. 
```sh
Basic truffle Commands:
  Compile: truffle compile
  Migrate: truffle migrate || truffle migrate --reset
  Test contracts: truffle test
```



