# The Ethereum Blockchain Explorer

This application will allow a user to view transaction data from the Ethereum blockchain associated with a specific wallet address **W** that the user inputs, starting with block **B**. The application will get information on:

- wallets (addresses)

- amounts of ETH associated with transactions made to and from the given wallet **W**

- show them in a table

The application will collect and display **ALL transaction data** starting from the given block **B**.

## Example

If a user requests to view transactions associated with the address **0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f** from block **9000000** to the current block, application will crawl and visualize all transaction data (addresses that have sent and received tokens from the address **0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f**, and how much **ETH** was used for a given transaction) in that period of time.

## Project setup

```
pnpm install
```

### Compiles and hot-reloads for development

```
pnpm run dev
```
