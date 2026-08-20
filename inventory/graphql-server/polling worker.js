// pollingWorker.js
import { inventoryCache } from './cache.js';

// Mocking an external warehouse API endpoint URL
const WAREHOUSE_API_URL = 'https://northstar-retail.internal';

/**
 * Simulates fetching data from the external warehouse API with custom retry logic
 */
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  try {
    // In a real app, this would be: await fetch(url);
    // Simulating a successful response payload from the warehouse
    return [
      { id: "1", sku: "NS-100", name: "Northstar Jacket", quantity: Math.floor(Math.random() * 100) },
      { id: "2", sku: "NS-200", name: "Classic Tee", quantity: Math.floor(Math.random() * 200) }
    ];
  } catch (error) {
    if (retries > 0) {
      console.warn(`⚠️ Fetch failed. Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(res => setTimeout(res, delay));
      return fetchWithRetry(url, retries - 1, delay * 2); // Exponential backoff
    }
    throw new Error("Warehouse API is entirely unreachable after max retries.");
  }
}

/**
 * Core engine execution block
 */
export async function runPollingWorker() {
  console.log(`[${new Date().toLocaleTimeString()}] 🔄 Ingestion Layer: Polling interval triggered.`);
  
  try {
    const rawData = await fetchWithRetry(WAREHOUSE_API_URL);
    
    // Normalize and commit data to the shared cache layer
    rawData.forEach(item => {
      inventoryCache.set(item.sku, item);
    });
    
    console.log(`✅ Ingestion Layer: Successfully synced ${rawData.length} items to cache.`);
  } catch (error) {
    console.error(` Ingestion Layer Critical Error: ${error.message}`);
    // Alert system or push to an error log queue
  }
}
