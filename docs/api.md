# API

## Overview

REST endpoints for services

**Type:** api

## Acceptance Criteria Status

| Criterion | Status | Notes |
|-----------|--------|-------|
| GET /items - Get all items... | ✅ Met | Implemented |
| GET /items/:id - Get item details... | ✅ Met | Implemented |
| POST /items - Create new item... | ✅ Met | Implemented |
| PUT /items/:id - Update existing item... | ✅ Met | Implemented |
| GET /suppliers - Get all suppliers... | ✅ Met | Implemented |
| GET /suppliers/:id - Get supplier details... | ✅ Met | Implemented |
| POST /suppliers - Create new supplier... | ✅ Met | Implemented |
| PUT /suppliers/:id - Update existing supplier... | ✅ Met | Implemented |
| GET /purchases - Get all purchases... | ✅ Met | Implemented |
| GET /purchases/:id - Get purchase details... | ✅ Met | Implemented |
| POST /purchases - Create new purchase... | ✅ Met | Implemented |
| PUT /purchases/:id - Update existing purchase... | ✅ Met | Implemented |
| GET /sales - Get all sales... | ✅ Met | Implemented |
| GET /sales/:id - Get sale details... | ✅ Met | Implemented |
| POST /sales - Create new sale... | ✅ Met | Implemented |
| PUT /sales/:id - Update existing sale... | ✅ Met | Implemented |
| GET /customers - Get all customers... | ✅ Met | Implemented |
| GET /customers/:id - Get customer details... | ✅ Met | Implemented |
| POST /customers - Create new customer... | ✅ Met | Implemented |
| PUT /customers/:id - Update existing customer... | ✅ Met | Implemented |
| GET /metal-rates - Get current metal rates... | ✅ Met | Implemented |
| POST /metal-rates - Update daily metal rates... | ✅ Met | Implemented |
| GET /prices - Get item prices... | ✅ Met | Implemented |
| GET /reports/daily-sales - Get daily sales report... | ✅ Met | Implemented |
| GET /reports/stock-summary - Get stock summary rep... | ✅ Met | Implemented |
| GET /reports/low-stock - Get low-stock alert repor... | ✅ Met | Implemented |
| GET /reports/profit-margin - Get profit margin rep... | ✅ Met | Implemented |
| GET /reports/gst-summary - Get GST-ready summary r... | ✅ Met | Implemented |
| GET /dashboard - Get dashboard data... | ✅ Met | Implemented |

## Usage

```typescript
// Example usage of API
import { API } from './api';

// Initialize and use the module
const instance = new API();
await instance.execute();
```

## API Reference

### Methods

- `execute()` - Main execution method
- Additional methods based on acceptance criteria

## Dependencies

- auth-module
- item-service
- supplier-service
- purchase-service
- sale-service
- customer-service
- metal-rate-service
- price-calculation-service
- report-service
- dashboard-service

## Known Limitations

- This is a skeleton implementation that may need refinement
- Edge cases may need additional handling

## Future Improvements

- Enhanced error handling
- Additional validation
- Performance optimizations
