[![MythXBadge](https://badgen.net/https/api.mythx.io/v1/projects/7c48238a-f03f-4c43-88ba-fe0e8cef6655/badge/data?cache=300&icon=https://raw.githubusercontent.com/ConsenSys/mythx-github-badge/main/logo_white.svg)](https://docs.mythx.io/dashboard/github-badges)

## SlyDe.Fi

---

<p>Blockchain Developer Bootcamp Final Project Submission</p>

###### Required Statements:

<p>describes the project: an entertaining prediction overconfidence exploiting re-distributive mechanism that uses pool-together-like yield farming. Also mints pretty graphs as NFTs... with a base redemable value.</p>
<p>Or, it's just a dapp that makes NFT graphs.</p>
<p>Follows Truffle directory structure. The ./frontend/ directory structure is explicit.</p>
<p>Where frontend?: ./frontend  </p>

<hr>

###### Live Instance

https://crimson-fire-2733.on.fleek.co/ <br/>
http://slyde.fi

#### Installing dependencies AND Running/Testing locally

Install [solc-select](https://github.com/crytic/solc-select) just so we're on the same page. <br>
Also, a good idea would be to have truffle installed (and npm): <br>

> npm install -g truffle

Did you clone the repo? No? Why not? ...I hope it's cloned by now. If not, you're in [big trouble](https://www.youtube.com/watch?v=IuRC3HEJ71M&ab_channel=JoelF1). <br/>

Now you are faced with a choice. Do you want to run your tests with or without forking mumbai testnet?

##### Fork Mumbai:

> bash ./run_tests.sh

press m to fork mumbai testnet and run tests

##### Locally

> bash ./run_tests.sh

press l to run local test suite

##### I trust every other line of code in this repo with the exception of your bashable script

> npm install && truffle test

##### I want to run the frontend locally

You will need a Moralis server. At the top of main.js you have to define: <br>

> const SERVER_URL /// Moralis Server URL <br>
> const APPID ///Moralis App ID

After that, just open Index.html in a browser.


#### For Questions or trojan-horse-like questions
[@parseb](https://twitter.com/parseb)

