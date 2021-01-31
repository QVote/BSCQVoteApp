// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

import "./Ownable.sol";
import "./SafeMath.sol";

/*
I fought far too long for this.
example parameters to deploy
"foo"
"bar"
["0x6162636400000000000000000000000000000000000000000000000000000000","0x6262636400000000000000000000000000000000000000000000000000000000"]
2524611661 //year 2050, should be 2077 xd
*/

contract QVoting is Ownable {
    using SafeMath for uint256;

    uint256 private _totalSupply;
    string public company; // company that creates the survey
    string public name; // name of the survey
    bytes32[] public optionTitles; // TODO do we really need this?
    mapping(address => uint256) private _balances;
    mapping(bytes32 => int256) private votes; // M : optionTitle -> optionVotes
    uint256 expirationTime; // in minutes
    // when a vote is casted, the voter has necessarily used all his credits, and voted for all the desired options
    event VoteCasted(address voter, uint256 creditsUsed);

    constructor(
        string memory company_,
        string memory name_,
        bytes32[] memory optionTitles_,
        uint256 expirationMin
    ) public {
        company = company_;
        name = name_;
        expirationTime = now + expirationMin * 1 minutes;

        for (uint256 i = 0; i < optionTitles_.length; i++) {
            optionTitles.push(optionTitles_[i]);
            // or maybe we could set the titles to strings
            // optionTitles.push(string(optionTitles_[i]))
        }
    }

    function vote(bytes32[] memory options, int256[] memory credits) public {
        require(
            options.length == credits.length,
            "Vote data incorrectly constructed: options and votes are not the same length"
        );
        require(
            now <= expirationTime,
            "Time's up for this election, can't vote anymore"
        );
        require(_balances[msg.sender] >= 0);

        // setting votes
        for (uint256 i = 0; i < options.length; i++) {
            int256 temp = credits[i];
            int256 toAdd = 0;
            if (temp >= 0) {
                toAdd = int256(sqrt(uint256(temp), 2));
            } else {
                toAdd = -1*int256(sqrt(uint256(-temp), 2));
            }
            votes[options[i]] = votes[options[i]] + toAdd;
        }

        uint256 totalCredits = sum(credits);
        _balances[msg.sender] = _balances[msg.sender].sub(totalCredits);
        emit VoteCasted(msg.sender, totalCredits);
    }

    function sum(int256[] memory array) pure private returns (uint256) {
        uint256 s;
        for (uint256 i = 0; i < array.length; i++) {
            s = s.add(array[i]>=0 ? uint256(array[i]) : uint256(-array[i]));
        }
        return s;
    }

    /**
     * Whether the election is still open for voting or not
     **/

    function getElectionStatus() public view onlyOwner returns (bool) {
        return (now <= expirationTime);
    }

    function mint(address voterAccount, uint256 amount) public onlyOwner {
        require(voterAccount != address(0), "minting to the zero address");
        _totalSupply = _totalSupply.add(amount);
        _balances[voterAccount] = _balances[voterAccount].add(amount);
    }

    function getResults()
        public
        view
        returns (bytes32[] memory, int256[] memory)
    {
        int256[] memory voteArray = new int256[](optionTitles.length);
        for (uint256 i = 0; i < optionTitles.length; i++) {
            voteArray[i] = (votes[optionTitles[i]]);
        }
        return (optionTitles, voteArray);
    }

    function getBalanceOf(address voterAddress)
        public
        view
        returns (uint256)
    {
        return _balances[voterAddress];
    }

	function getVotingInfo() 
		public 
		view 
		returns(string memory, string memory, bytes32[] memory)
	{
		return (company, name, optionTitles); 
	}

    /**
     * @dev returns the square root (in int) of a number
     * to get better precision, the results returned are multiplied by sqrt('precision')
     * @param x the number (int)
     * @param precision_   :  x gets multiplied by 10**(2*precision)
     */
    function sqrt(uint256 x, uint256 precision_)
        internal
        pure
        returns (uint256 y)
    {
        x = x * (10**(2 * precision_));
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

}
