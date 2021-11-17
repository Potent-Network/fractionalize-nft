require("dotenv").config({ path: "./config.env" });
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const BigNumber = require("bignumber.js");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/ERC721VaultFactory.sol/ERC721VaultFactory.json");

// TokenVault contract
const tokenVaultAddress = "0xd5b998de44e237562d44Db0Be676d0F2574760A4";
// NFT contract
const nftTokenAddress = "0x579A9A433Cae7b0B67b7c79D6f710aC46dC86bc0";

const tokenVaultContract = new web3.eth.Contract(
  contract.abi,
  tokenVaultAddress
);

async function mintVault() {
  const nonce2 = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  let supply = new BigNumber(100000000000000000000000);
  const tx = {
    from: PUBLIC_KEY,
    to: tokenVaultAddress,
    nonce: nonce2,
    gas: 5000000,
    data: tokenVaultContract.methods
      .mint("arnav3", "NAV3", nftTokenAddress, 3, supply)
      .encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

mintVault();
console.log("minted");
