# AptosPay NPM Package

AptosPay is a streamlined NPM package designed to facilitate Aptos payment processing within your application. Key functionalities include shop initialization, order creation, payment status checks, and the ability to claim payments.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Namespace](#namespace)
- [Notes](#notes)

## Installation

To install the AptosPay package, use the npm  or yarn command:

```bash
npm install aptos-pay
```

```bash
yard add aptos-pay
```

## Usage
Begin by importing the required functions and types:

```bash
import {
  initShop,
  createOrder,
  getPaymentAddressByUid,
  checkPaymentStatus,
  claimPayments
} from 'aptos-pay';
```

## API Reference

# 1. IniShop
```bash
function initShop(privateKey: string, moduleAddress: string): Promise<{ success: boolean; }>
```

- Initializes a shop.
- Returns a Promise with a success status.

# 2. createOrder
```bash
function createOrder(amount: number, privateKey: string, moduleAddress: string): Promise<{ success: boolean; orderId: number; }>
```
- Creates a new order.
- Returns a Promise with a success status and an orderId

# 3. getPaymentAddressByUid
```bash
function getPaymentAddressByUid(orderId: string, storeOwnerAddress: string, moduleAddress: string)
```

- Retrieves payment address by order UID.

# 4. checkPaymentStatus
```bash
function checkPaymentStatus(orderId: string, storeOwnerAddress: string, moduleAddress: string): Promise<{ success: boolean; status: string; }>
```
- Checks the payment status for an order.
- Returns a Promise with a success status and a payment status (e.g., "COMPLETED").

# 5. claimPayments
```bash
function claimPayments(privateKey: string, moduleAddress: string): Promise<{ success: boolean; message: string; }>
```

- Claims all pending payments.
- Returns a Promise with a success status and a message.

## Namespace
# AptosPay

Exports:
```bash
- `initShop`
- `createOrder`
- `getPaymentAddressByUid`
- `checkPaymentStatus`
- `claimPayments`
```

## Notes
- Ensure that you handle exceptions and errors adequately within your application. The provided functions do log the errors to the console, but it's recommended to implement a more robust error handling mechanism based on your specific needs.

- Always keep your private keys secure and never expose them in client-side code.