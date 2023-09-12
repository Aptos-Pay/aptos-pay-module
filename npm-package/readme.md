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

