const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains')
    const domainContract = await domainContractFactory.deploy();
    await domainContract.deployed();
    console.log('Contract deployed at: ', domainContract.address);
    console.log('Contract deployed by: ', owner.address);

    const txn = await domainContract.register('DOOM');
    await txn.wait();

    const domainOwner = await domainContract.getAddress('DOOM');
    console.log('Owner of domain: ', domainOwner);

    // Trying to set a record that doesn't belong to me!
    try {
        txn = await domainContract.connect(randomPerson).setRecord('DOOM', "Haha my domain now!");
        await txn.wait();
    } catch (err) {
        console.log('You dont own this domain.');
    }
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