async function main() {
  // const ERC721VaultFactory = await ethers.getContractFactory(
  //   "ERC721VaultFactory"
  // );
  
  // const AthleteNFT = await ethers.getContractFactory(
  //    "AthleteNFT"
  // );

  // // Start deployment, returning a promise that resolves to a contract object
  // const AthleteNFTDeployed = await AthleteNFT.deploy();
  // console.log("Contract deployed to address:", AthleteNFTDeployed.address);

  const ERC721VaultFactory = await ethers.getContractFactory(
     "ERC721VaultFactory"
  );

  // Start deployment, returning a promise that resolves to a contract object
  const ERC721VaultFactoryDeployed = await ERC721VaultFactory.deploy();
  console.log("Contract deployed to address:", ERC721VaultFactoryDeployed.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
