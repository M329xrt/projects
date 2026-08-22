// cache.js

/**
 * Shared In-Memory Inventory Data Store
 * Using a native JavaScript Map for fast, key-value lookups by SKU.
 */
//export const inventoryCache = new Map();


//store attendee data
//mock 
export const attendeeCache = new Map([
  ["QR-SUSAN", { qrCode: "QR-SUSAN", name: "Susan", status: "NOT_CHECKED_IN" }],
  ["QR-JOHN", {  qrCode: "QR-JOHN", name: "John", status: "NOT_CHECKED_IN"  }],
  ["QR-ALICE", {  qrCode: "QR-ALICE", name: "Alice", status:"NOT_CHECKED_IN"  }],
  ["QR-CARTER", { qrCode: "QR-CARTER", name: "Carter", status: "PENDING_PRINT" }],
  ["QR-JANE", { qrCode: "QR-JANE", name: "Jane", status:  "PENDING_PRINT" }],
  
  ["QR-KIMANI", {qrCode: "QR-KIMANI", name: "Kimani", status: "PENDING_PRINT" }],
  ["QR-MARK", {qrCode: "QR-MARK", name: "Mark", status: "PRINT_COMPLETED" }],
  ["QR-SPENCE", {qrCode: "QR-SPENCE", name: "Spence", status: "PRINT_COMPLETED" }]
 

]);
