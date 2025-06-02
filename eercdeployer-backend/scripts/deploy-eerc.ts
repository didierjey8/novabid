const name = process.env.name || 'TESTeERC';
const symbol = process.env.symbol || 'TESTeERC';
const decimals = process.env.decimals || 18;
const initialSupply = process.env.initialSupply || "10000";
const initialAddress = process.env.initialAddress || '0x3F077128732d8a0150c177B12259b11B549c516C';

import { ethers, run } from "hardhat";
import { deployLibrary, deployVerifiers } from "../test/helpers";
import { EncryptedERC__factory } from "../typechain-types";

const main = async () => {
	// get deployer
	const [deployer] = await ethers.getSigners();

	// deploy verifiers with proper trusted setup
	const {
		registrationVerifier,
		mintVerifier,
		withdrawVerifier,
		transferVerifier,
    burnVerifier,
	} = await deployVerifiers(deployer, true);

	// deploy babyjub library
	const babyJubJub = await deployLibrary(deployer);

	// deploy registrar contract
	const registrarFactory = await ethers.getContractFactory("Registrar");
	const registrar = await registrarFactory.deploy(registrationVerifier);
	await registrar.waitForDeployment();

	// deploy eERC20
	const encryptedERCFactory = new EncryptedERC__factory({
		"contracts/libraries/BabyJubJub.sol:BabyJubJub": babyJubJub,
	});

	const erc20Factory = await ethers.getContractFactory("SimpleERC20");
	const erc20 = await erc20Factory.deploy(name, symbol, decimals);
	await erc20.waitForDeployment();

	const tx = await erc20.mint(initialAddress, ethers.parseEther(initialSupply));
	await tx.wait();

	console.log("ERC20 deployed at:", erc20.target);

	const encryptedERC_ = await encryptedERCFactory.connect(deployer).deploy({
		registrar: registrar.target,
		isConverter: true,
		name,
		symbol,
		mintVerifier,
		withdrawVerifier,
		transferVerifier,
    burnVerifier,
		decimals,
		convertedToken: erc20.target,
	});
	await encryptedERC_.waitForDeployment();

	const deploymentResult = {
		registrationVerifier,
		mintVerifier,
		withdrawVerifier,
		transferVerifier,
		burnVerifier,
		babyJubJub,
		registrar: registrar.target,
		encryptedERC: encryptedERC_.target,
		convertedToken: erc20.target,
	};

	console.log("__DEPLOYMENT_RESULT__" + JSON.stringify(deploymentResult));

	/*console.log("\nWaiting for block confirmations before verification...");
	await new Promise(resolve => setTimeout(resolve, 30000)); // 30 second delay

	console.log("\nStarting contract verification...");

	// Verify Registration Verifier contract
	try {
		await run("verify:verify", {
			address: registrationVerifier,
			constructorArguments: [],
		});
		console.log("Registration Verifier contract verified!");
	} catch (error) {
		console.error("Registration Verifier verification failed:", error);
	}

	// Verify Mint Verifier contract
	try {
		await run("verify:verify", {
			address: mintVerifier,
			constructorArguments: [],
		});
		console.log("Mint Verifier contract verified!");
	} catch (error) {
		console.error("Mint Verifier verification failed:", error);
	}

	// Verify Withdraw Verifier contract
	try {
		await run("verify:verify", {
			address: withdrawVerifier,
			constructorArguments: [],
		});
		console.log("Withdraw Verifier contract verified!");
	} catch (error) {
		console.error("Withdraw Verifier verification failed:", error);
	}

	// Verify Transfer Verifier contract
	try {
		await run("verify:verify", {
			address: transferVerifier,
			constructorArguments: [],
		});
		console.log("Transfer Verifier contract verified!");
	} catch (error) {
		console.error("Transfer Verifier verification failed:", error);
	}

  // Verify Burn Verifier contract
  try {
    await run("verify:verify", {
      address: burnVerifier,
      constructorArguments: [],
    });
    console.log("Burn Verifier contract verified!");
  } catch (error) {
    console.error("Burn Verifier verification failed:", error);
  }

	// Verify BabyJubJub library
	try {
		await run("verify:verify", {
			address: babyJubJub,
			constructorArguments: [],
		});
		console.log("BabyJubJub library verified!");
	} catch (error) {
		console.error("BabyJubJub verification failed:", error);
	}

	// Verify Registrar contract
	try {
		await run("verify:verify", {
			address: registrar.target,
			constructorArguments: [registrationVerifier],
		});
		console.log("Registrar contract verified!");
	} catch (error) {
		console.error("Registrar verification failed:", error);
	}

	// Verify EncryptedERC contract
	try {
		await run("verify:verify", {
			address: encryptedERC_.target,
			constructorArguments: [{
				registrar: registrar.target,
				isConverter: true,
				name: "encrypted yellow ket",
				symbol: "eKET",
				mintVerifier,
				withdrawVerifier,
				transferVerifier,
        burnVerifier,
				decimals: 18,
				convertedToken: "0xFFFF003a6BAD9b743d658048742935fFFE2b6ED7",
			}],
		});
		console.log("EncryptedERC contract verified!");
	} catch (error) {
		console.error("EncryptedERC verification failed:", error);
	}*/
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});