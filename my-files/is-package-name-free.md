✅ 1. How to check if a package name is already taken
🧪 Method A: Search on npmjs.com
Go to:
🔗 https://www.npmjs.com/package/moyal.js.test

If it exists, it shows package details.

If it doesn’t exist, you’ll see:

“Oops! We couldn’t find that page.”

🔍 You can also try:

npm info moyal.js.test — to see if it exists via CLI

🧪 Method B: Use npm CLI

npm view moyal.js.test


If it prints package info → it's taken.

If it errors with 404 Not Found → it's available.

