const { ethers } = require("hardhat");

async function main() {
  const VeriScanAI = await ethers.getContractFactory("VeriScanAI");
  const contract = await VeriScanAI.deploy();

  await contract.deployed();   // IMPORTANT: ethers v5 syntax

  console.log("VeriScanAI deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
