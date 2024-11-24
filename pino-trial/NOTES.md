## Different Levels of Logging

1. INFO :: Significant and noteworthy business events
2. WARN :: Abnormal situations that may indicate future problems
3. ERROR :: Unrecoverable errors which are specific to a specific operation
4. FATAL :: Unrecoverable errors which affect the entire system 

## Structures Logging
```json
{
  "agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit",
  "client": "172.17.0.1",
  "compression": "2.75",
  "referer": "POST /not-found HTTP/1.1",
  "size": 153,
  "status": 404,
  "timestamp": "2021-04-01T12:02:321",
  "user": "alice",
}


## Good things
1. Request IDs (for tracking requests across microservices)
2. User IDs (for user session context)
3. System state data (like database or cache status)
4. Full error context (stack traces when relevant)

## Log Sampling (Cut Loggging Costs)
1. Do Log Sampling where for 10 identical events, you can store only 2 of them
2. Sample the success logs, but not error logs
3. Canonical log lines instead of logging every single event into the log file
```
## Retention Policy
1. Error logs retained for 90 days
2. Debug logs retained for 8 days (short term retention for immediate trouble shooting)
3. Security Audit Logs (Retained for 365 days to meet compliance requirements)

- Older logs can be moved to cheaper "cold" storage
- Logs are eventually deleted when they are no-longer needed
- Retention periods are tailored to the importance and use-case of each log type

## Security approaches to Sensitive Logs
1. Encryption in transit
2. Encryption at rest
3. Access controls (only the right folks should be able to read them)

## Performance Impact
1. Choose an efficient logging library
2. Use log sampling in high-traffic paths
3. Log to a separate disk partition
4. Run load tests to catch logging bottlenecks

## Common Mistake
Do not use logs for everything. Use metrics (Prometheus and Grafana). Use logs 
to DEBUG problems but use metrics to identify problems.
