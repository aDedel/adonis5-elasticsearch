declare module "@ioc:Adonis/Addons/Elasticsearch" {
  import { Client } from "@elastic/elasticsearch";

  const ElasticsearchProvider: Client;
  export default ElasticsearchProvider;
}
