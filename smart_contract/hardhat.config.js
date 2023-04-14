require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/emAIVH2bZ8CV3E6OWGisGfSC204wPuS_",
      accounts: [
        "732b2e3c217a845c1feae1bc72e26c41a8280c0987461ae93187b9bdbe6c1689",
      ],
    },
  },
};
