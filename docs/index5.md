# index5-multipleBackends.js

Introduces another data source to demonstrate how resolves can fetch data from multiple sources.

The static JSON Book file was moved into it's own file and function were added to simulate a back-end data provider.

A new service was added to simulate a new Author service. Another service was created for this as well.

These services are exposed via the 'context' when the Apollo Server is first created. Each resolver has access to this context and can utilized any information placed on the context.

When the books are fetched they no longer provide the name of the author, but rather and authorId. The new AuthorService is then called to fetch the name of the author based on the authorId.
