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
# day 3 integration

- Blocker: Node.js threw variable redeclaration syntax errors and import errors on boot.
- What it was: duplicate blocks of code together inside index.js and tried to import from a filename containing a space.
- The fix: removed duplicate variable assignments, and streamlined imports to use the decoupled 'pollingWorker.js' asset.
