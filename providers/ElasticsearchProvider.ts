import { ApplicationContract } from "@ioc:Adonis/Core/Application";
import { Client } from "@elastic/elasticsearch";

const defaultHost = "https://127.0.0.1:9200";

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
*/
export default class ElasticsearchProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    const client = this.createConnection();

    // Register elasticsearch client
    this.app.container.singleton("Adonis/Addons/Elasticsearch", () => client);
  }

  public async boot() {
    // App boot
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // App is shutting down
  }

  /**
   * Create elasticsearch connection
   */
  private createConnection(): Client {
    // Register bindings
    const Env = this.app.container.resolveBinding("Adonis/Core/Env");
    const host = Env.get("ELASTICSEARCH_URI") || defaultHost;
    const username = Env.get("ELASTICSEARCH_USER");
    const password = Env.get("ELASTICSEARCH_PASSWORD");
    const options = Env.get("ELASTICSEARCH_OPTIONS");
    const config = options ? JSON.parse(options) : {};

    const basicAuth =
      host && username && password
        ? {
            node: host,
            auth: { username, password },
          }
        : {};

    return new Client({ ...config, ...basicAuth });
  }
}
