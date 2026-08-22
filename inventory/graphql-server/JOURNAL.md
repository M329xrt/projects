# Susan - Learning and blockers Journal
## Learning
 - Tool chosen : GraphQl which needed previous knowledge on Node.js so i had to learn that to
 - Primary documentation used: Official Apollo Server Docs
 - time spent on research: 4hrs
 - Time spent building: 2 hrs 30 mins

 ## Blocker Logs
 - Blocker: Tried running `mkdir graphql server` which created two separate folders.
- The fix: Used `mkdir graphql-server` with a hyphen instead

# File Creation via Command Line
-  Blocker:Accidentally ran `mkdir index.js` creating a folder instead of a flat file. Node would not execute it.
- the fix:Deleted the folder using `rmdir index.js` and generated a flat text file using `echo. > index.js`.

# Argument Destructuring in Resolvers
- Blocker:** Initial mutation tests returned `null` or `undefined` because I tried reading variables directly from the first argument.
## day 3 integration

- Blocker: Node.js threw variable redeclaration syntax errors and import errors on boot.
- What it was: duplicate blocks of code together inside index.js and tried to import from a filename containing a space.
- The fix: removed duplicate variable assignments, and streamlined imports to use the decoupled 'pollingWorker.js' asset.

// in pollingWorker.js 
The warehouse API is mocked, so the retry/backoff branch is implemented but not triggered by a real network failure.

## Part 4: Day 4 Pivot Analysis (RabbitMQ Integration)

#  New Technology Adoption
- Technology Introduced: `amqplib` (RabbitMQ Protocol client framework).
- Implementation Strategy: Integrated a real messaging backend channel to push asynchronous buffer payloads (`badge_print_jobs`) securely instead of utilizing synchronous blocking HTTP connections.

# Regression & Duplicate Scan Verification
- Edge-Case Validation:If an attendee attempts a duplicate scan instantly after a job is buffered into RabbitMQ, our memory layer blocks execution at the resolver runtime layer, entirely shielding the printing infrastructure from processing out-of-order execution conflicts.

#  Package Dependency Error
- the Blocker: npm failed with error code `E404 Not Found` when trying to install the message broker library.
- What it  was:A syntax typo in the install command (`amqlib` instead of the correct package name `amqplib`).
- the Fix: Corrected the package identifier name string to include the mising 'p' and ran `npm install amqplib express`.

#   Node Modules Flush Error
- the blocker: Running `npm install amqplib` unintentionally removed 109 critical project packages.
- What it actually was: npm cleared out local dependencies that weren't fully committed or locked in the package manifest tree.
-  fix: Recovered the application space by running a combined explicit installation string: `npm install @apollo/server graphql express amqplib`.
# Enum Case-Sensitivity Error
- the blocker: Sandbox failed with an internal server error stating `Enum "CheckInStatus" cannot represent value: "Not_checked_in"`.
- What it actually was: GraphQL enums require strict case symmetry. The engine schema expected all-caps strings (`NOT_CHECKED_IN`), while the `cache.js` mock initialization vector data layer used title-case strings (`Not_checked_in`).
- The fix: Updated the raw data properties in `cache.js` to use uppercase string attributes matching the declared schema configurations.

