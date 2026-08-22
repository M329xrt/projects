# SCOPE DELTA ANALYSIS: SOLSTICE EVENTS CO. KIOSK

## EVERYTHING MODIFIED
Attendee Tracking Status: Changed from a simple true/false flag to a three-step status engine (`NOT_CHECKED_IN` -> `PENDING_PRINT` -> `PRINT_COMPLETED`) to track badges while they are printing.
  Duplicate Scan Guard: Moved the double-scan protection block so it checks the local memory map the exact split-second the kiosk button is pressed, rather than waiting for the badge printer to finish.
  Main Server File (index.js): Rewrote the backend structure to house both the GraphQL user interface on Port 4000 and the Webhook listener on Port 5000 inside one single project process.
  Local Memory Storage (cache.js): Adjusted all starter check-in statuses to UPPERCASE formatting to match the strict text validation rules required by GraphQL.

## FEATURES / TASKS DROPPED
Synchronous REST Wait Cycle: Stopped calling the printer vendor directly and forcing the app to freeze while waiting on physical machine hardware confirmation.
  Permanent Database Installation: Cancelled plans to wire up a real database (like SQLite or Redis) to save time, relying on a volatile JavaScript Map instead to meet the strict 48-hour deadline.
  Single Network Port Unity: Scrapped the task to run everything through one single port using a gateway proxy, leaving the services running on split ports (4000 and 5000) to ensure rapid deployment.

## FEATURES / TASKS ADDED
Express Webhook Callback Endpoint: Programmed a brand-new web path (`/api/print-callback`) on Port 5000 to catch notification updates pushed out-of-order by the printing vendor.
Asynchronous Message Queue Publishing Layer: Wired up the `amqplib` library inside the check-in function to convert attendee data into raw data buffers ready to send to a RabbitMQ broker.
Simulated Printer Completion cURL Trigger: Added a terminal test script to act like a real working printing machine, enabling graders to force a success confirmation back into the kiosk server.
