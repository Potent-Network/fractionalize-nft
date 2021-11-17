require("dotenv").config({ path: "./config.env" });
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const AthleteContract = require("../artifacts/contracts/AthleteNFT.sol/AthleteNFT.json");

// TokenVault contract
const tokenVaultAddress = "0xd5b998de44e237562d44Db0Be676d0F2574760A4";
// NFT contract
const nftTokenAddress = "0x579A9A433Cae7b0B67b7c79D6f710aC46dC86bc0";

const athleteNFTContract = new web3.eth.Contract(
  AthleteContract.abi,
  nftTokenAddress
);
//const mintnftContract = new web3.eth.Contract(contract2.abi, nftTokenAddress);
async function approve() {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  const approvetx = {
    from: PUBLIC_KEY,
    to: nftTokenAddress,
    nonce: nonce,
    gas: 5000000,
    data: athleteNFTContract.methods
      .setApprovalForAll(tokenVaultAddress, true)
      .encodeABI(),
  };

  const signApprove = web3.eth.accounts.signTransaction(approvetx, PRIVATE_KEY);
  signApprove
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

approve();
console.log("approved");
