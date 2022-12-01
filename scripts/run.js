const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains')
    const domainContract = await domainContractFactory.deploy('naruto');
    const domainName = 'NINETAILS';
    await domainContract.deployed();
    console.log('Contract deployed at: ', domainContract.address);

    const txn = await domainContract.register(domainName, {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();

    const address = await domainContract.getAddress(domainName);
    console.log(`Owner of ${domainName}: `, address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log('Contract balance: ', hre.ethers.utils.formatEther(balance));

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