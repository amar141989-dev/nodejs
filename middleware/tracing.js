
const { trace, context } = require('@opentelemetry/api')

const tracing = (req, res, next) => {
    const tracer = trace.getTracer('default');
    const parentSpan = tracer.startSpan('http_request');

    // Use context to propagate the span
    context.with(trace.setSpan(context.active(), parentSpan), () => {
        res.on('finish', () => {
            parentSpan.setAttributes({
                'http.method': req.method,
                'http.url': req.originalUrl,
                'http.status_code': res.statusCode,
            });
            parentSpan.end();
        });
        next();
    });
}

module.exports = tracing