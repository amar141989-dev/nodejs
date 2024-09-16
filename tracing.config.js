const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { Resource } = require("@opentelemetry/resources");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { ATTR_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');

//Set up the tracer provider and exporter  
const provider = new NodeTracerProvider({
    resource: new Resource({
        [ATTR_SERVICE_NAME]: 'nodejs-service',
      }),
});

const exporter = new OTLPTraceExporter({
});

//Create a span processor and register it with tracer provider 
const spanProcessor = new SimpleSpanProcessor(exporter);
provider.addSpanProcessor(spanProcessor);

module.exports = { provider }
