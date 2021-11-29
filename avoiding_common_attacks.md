## Security Decisions

<p> SlyDeFi.sol is not vulnerable to any of the attack vectors listed in the SWC registry. Would be pretty embarrasing if that's the case... not only for me as I do think that I can conciously avoid them, but also for the two industry leading automatic analysis detection tools. Open an issue if you think I'm wrong.👏🏽 Humble me you shadowycoder!</p>

###### Good:

<p>
The primary contract: uses a fixed pragma version, makes use of pull payments (debatable if it adds any extra security in this specific context), imports from trusted sources, does not make low-level calls 🤔, strives to keep true to the checks-effects-interactions pattern, uses re-entrancy guard, uses only owner, emits standardized events, avoids user inputs.
</p>

###### Maybe Not Ideal:

<p>
    <ul>
        <li>Not much of an effort in validating user inputs.</li>
        <li>[Return values](https://consensys.net/diligence/audits/2020/09/aave-protocol-v2/#unhandled-return-values-of-transfer-and-transferfrom) from external calls missing/not used.</li>
        <li>Very dependent on Chainlink services. </li>
        <li>Event coverage unchecked. </li>
        <li>Insufficient test coverage. </li>
        <li>Requires *.setERCAllowance()* initialization after deployment.</li>
    </ul>
</p>

###### Ideal (in a non-ideal world, ideals are subjective... arguably ofc):

<p>
<ul>
    <li> Non-upgradeable, Immutable, no rug-pulling opportunity, minimal attack surface given the functionality</li>
</ul>
</p>
