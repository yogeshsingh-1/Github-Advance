# MongoDB Limits and Thresholds

## 1. Document Limits

| Limit | Value |
|--------|-------|
| Maximum BSON Document Size | 16 MB |
| Maximum Nesting Depth | 100 Levels |
| Maximum BSON Object Size | 16 MB |
| Maximum Array Elements | Practical ~4 Million (depends on document size) |

> **Note:** Agar file 16 MB se badi ho to **GridFS** use karein.

---

## 2. BSON Data Type Limits

| Data Type | Limit |
|-----------|-------|
| String | Up to 16 MB (within document limit) |
| Binary Data | Up to 16 MB (GridFS for larger files) |
| Int32 | -2,147,483,648 to 2,147,483,647 |
| Int64 (Long) | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |
| Double | IEEE 754 64-bit Floating Point |
| Decimal128 | 34 Decimal Digits Precision |
| Date | 64-bit Milliseconds Since Unix Epoch |

---

## 3. Collection Limits

| Limit | Value |
|--------|-------|
| Namespace Length | 255 Bytes (Unsharded) |
| Namespace Length (Sharded) | 235 Bytes |
| Collections per Database | No Fixed Limit |
| Documents per Collection | No Fixed Limit |

---

## 4. Database Limits

| Limit | Value |
|--------|-------|
| Databases per Server | No Fixed Limit |
| Database Name Length | Less than 64 Bytes |
| Database Name Restrictions | Cannot contain `/ \ . " $ * < > : | ?` |

---

## 5. Field Name Limits

| Limit | Value |
|--------|-------|
| Maximum Field Name Length | No Fixed Limit (document size applies) |
| Field Name Cannot Contain | Null Character (`\0`) |
| Dot (`.`) and Dollar (`$`) | Supported in modern MongoDB versions but should be used carefully |

---

## 6. Index Limits

| Limit | Value |
|--------|-------|
| Maximum Indexes per Collection | 64 |
| Maximum Compound Index Fields | 32 |
| Maximum Index Key Size | 1024 Bytes |
| Maximum Text Index per Collection | 1 |
| Wildcard Indexes | Unlimited (subject to overall index limit) |
| TTL Index per Collection | Multiple Allowed |
| Hashed Index Fields | One Hashed Field per Compound Index |

---

## 7. Query Limits

| Limit | Value |
|--------|-------|
| Maximum Query Document Size | 16 MB |
| Maximum Batch Size | 16 MB or 101 Documents (Initial Batch) |
| Cursor Timeout | 10 Minutes of Inactivity (Default) |
| Maximum `$in` Values | No Fixed Limit (performance degrades with large arrays) |

---

## 8. Aggregation Limits

| Limit | Value |
|--------|-------|
| Pipeline Stages | 1000 |
| Memory Limit | 100 MB |
| Disk Usage | `allowDiskUse: true` to exceed 100 MB |
| Result Document Size | 16 MB |

---

## 9. Transaction Limits

| Limit | Value |
|--------|-------|
| Maximum Transaction Lifetime | 60 Seconds (Default) |
| Maximum BSON Operation Size | 16 MB |
| Maximum Transaction Size | Limited by WiredTiger Cache |

---

## 10. Sharding Limits

| Limit | Value |
|--------|-------|
| Maximum Shard Key Size | 512 Bytes |
| Maximum Chunks per Collection | No Fixed Limit |
| Maximum Shards | No Fixed Limit (depends on deployment) |
| Jumbo Chunk Size | Cannot exceed Chunk Size without split |

---

## 11. Replication Limits

| Limit | Value |
|--------|-------|
| Replica Set Members | 50 |
| Voting Members | 7 |
| Arbiters | Multiple Allowed (not recommended) |
| Primary Nodes | 1 |
| Secondary Nodes | Up to 49 |

---

## 12. Connection Limits

| Limit | Value |
|--------|-------|
| Maximum Connections | Depends on OS Resources |
| Default Connection Pool Size (Drivers) | Usually 100 |

---

## 13. GridFS Limits

| Limit | Value |
|--------|-------|
| Default Chunk Size | 255 KB |
| Maximum File Size | Practically Unlimited |

---

## 14. Write Limits

| Limit | Value |
|--------|-------|
| Bulk Write Operations | 100,000 Operations per Batch |
| Maximum Write Command Size | 16 MB |

---

## 15. Change Streams

| Limit | Value |
|--------|-------|
| Resume Token | Required for Resume |
| Stream Lifetime | Until Cursor Expires or Closed |

---

## 16. Time Series Collection Limits

| Limit | Value |
|--------|-------|
| Bucket Maximum Size | 125 KB (Approx.) |
| Bucket Maximum Span | Configurable |

---

## 17. Capped Collection Limits

| Limit | Value |
|--------|-------|
| Size | Fixed at Creation |
| Documents | Oldest Documents Automatically Removed |

---

## 18. BSON ObjectId

| Property | Value |
|----------|-------|
| Size | 12 Bytes |
| Timestamp | 4 Bytes |
| Random Value | 5 Bytes |
| Counter | 3 Bytes |

---

# Important Limits for Interviews ⭐

- Maximum BSON Document Size → **16 MB**
- Maximum Nesting Depth → **100 Levels**
- Maximum Indexes per Collection → **64**
- Maximum Compound Index Fields → **32**
- Maximum Index Key Size → **1024 Bytes**
- Maximum Shard Key Size → **512 Bytes**
- Maximum Aggregation Memory → **100 MB**
- Maximum Aggregation Pipeline Stages → **1000**
- Maximum Transaction Lifetime → **60 Seconds**
- Maximum Replica Set Members → **50**
- Maximum Voting Members → **7**
- Maximum Write Batch Operations → **100,000**
- Initial Cursor Batch → **101 Documents or 16 MB**
- Default GridFS Chunk Size → **255 KB**
- Maximum BSON Object Size → **16 MB**