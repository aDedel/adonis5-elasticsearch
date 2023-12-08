# Install Elasticsearch Provider in Adonis

## Install dependency

```bash
npm i @dedel.alex/adonis5-elasticsearch
```

## Run command

```bash
node ace configure @dedel.alex/adonis5-elasticsearch
```

### Configure Elasticsearch

```bash
# Elasticsearch HOST
ELASTICSEARCH_URI=https://127.0.0.1:9200

# Elasticsearch user
ELASTICSEARCH_USER="elastic"

# Elasticsearch password
ELASTICSEARCH_PASSWORD=""

# Elasticsearch options
ELASTICSEARCH_OPTIONS=""
```

### Usage

Here is an example of how to use the Elasticsearch Provider:

```ts
import client from "@ioc:Adonis/Addons/Elasticsearch";

// Get index - where the documents are stored.
const index = await client.index({
  index: "game-of-thrones",
  document: {
    character: "Ned Stark",
    quote: "Winter is coming.",
  },
});

// here we are forcing an index refresh, otherwise we will not
// get any result in the consequent search
await client.indices.refresh({ index: "game-of-thrones" });

// Let's search!
const result = await client.search({
  index: "game-of-thrones",
  query: {
    match: { quote: "winter" },
  },
});

console.log(result.hits.hits);
```

For more information about Elasticsearch, check the [offical website](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)

# Github project

https://github.com/aDedel/adonis5-elasticsearch
