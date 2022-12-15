const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains')
    const domainContract = await domainContractFactory.deploy('naruto');
    const domainName = 'NINETAILS';
    await domainContract.deployed();
    console.log('Contract deployed at: ', domainContract.address);

    let txn = await domainContract.register(domainName, {value: hre.ethers.utils.parseEther('1234')});
    await txn.wait();

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log('Contract balance: ', hre.ethers.utils.formatEther(balance));

    // try to take funds as random person
    try {
        txn = await domainContract.connect(randomPerson).withdraw();
        await txn.wait();
    } catch (err) {
        console.log('Could not rob contract');
    }

    // Let's look in wallet to compare later
    let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log('Balance of owner before withdrawal: ', hre.ethers.utils.formatEther(ownerBalance))

    // Oops, looks like the owner is saving their money!
    txn = await domainContract.connect(owner).withdraw();
    await txn.wait();

    // Fetch balance of contract & owner
    const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
    ownerBalance = await hre.ethers.provider.getBalance(owner.address);

    console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
    console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
    
    // txn = await domainContract.register(domainName, {value: hre.ethers.utils.parseEther('0.1')});
    // await txn.wait();

    // const address = await domainContract.getAddress(domainName);
    // console.log(`Owner of ${domainName}: `, address);

    // Trying to set a record that doesn't belong to me!
    // try {
    //     txn = await domainContract.connect(randomPerson).setRecord('DOOM', "Haha my domain now!");
    //     await txn.wait();
    // } catch (err) {
    //     console.log('You dont own this domain.');
    // }
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