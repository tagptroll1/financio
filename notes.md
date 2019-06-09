## Snippets for later use:
```javascript
> console.log(Buffer.from("Hello World").toString('base64'));
SGVsbG8gV29ybGQ=
> console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
Hello World

if (!body.password)
    return response.status(400).json({ message: "Missing password field" })

const hash = crypto.createHash("sha256");
hash.update(body.username);

const verficationHash = hash.digest("hex");
```

## Todos
* PUT endpoint to change users, requires encryption and hash verification from snippets above  
    * Altering finance changes income and expenses, the data field consists of multiple objects representing the highest level categories of expenses.
    * The categories contains a json of more detailed expense datas which will be used to draw the graphs later.