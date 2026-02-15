const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const VeriScanAI = await ethers.getContractFactory("VeriScanAI");
  const contract = await VeriScanAI.attach(contractAddress);

  // Register a product
  const tx = await contract.registerProduct(
    "P001",
    "Nike Air Jordan",
    "Nike",
    "QmFakeIPFSHash"
  );

  await tx.wait();

  console.log("Product registered successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

   