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
