const main = async () => {
  const domainName = 'casper'
  const domainRecord = 'Message for my record'
  const domainContractFactory = await hre.ethers.getContractFactory('Domains')
  const domainContract = await domainContractFactory.deploy('ghost');
  await domainContract.deployed();
  console.log('Contract deployed at: ', domainContract.address);

  let txn = await domainContract.register(domainName, {value: hre.ethers.utils.parseEther('0.1')});
  txn.wait();

  txn = await domainContract.getAddress(domainName);
  console.log('Address: ', txn)

  txn = await domainContract.setRecord(domainName, domainRecord);

  txn = await domainContract.getRecord(domainName);
  console.log('Record: ', txn)

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
      await main();
      process.exit(0);
  } catch (err) {
      console.log(err);
      process.exit(1);
  }
}

runMain();