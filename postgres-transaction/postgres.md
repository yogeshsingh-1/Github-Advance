# PostgreSQL Running Transactions Commands

## 1. View All Active Transactions

```sql
SELECT
    pid,
    usename,
    datname,
    state,
    xact_start,
    query_start,
    query
FROM pg_stat_activity
WHERE state = 'active';
```

### Purpose

This query is used to display all currently active database sessions and the SQL queries they are executing.

### Columns

| Column        | Description                                                                     |
| ------------- | ------------------------------------------------------------------------------- |
| `pid`         | Process ID of the PostgreSQL backend. Used to identify and terminate a session. |
| `usename`     | Username executing the query.                                                   |
| `datname`     | Database name where the query is running.                                       |
| `state`       | Current state of the session (`active`, `idle`, `idle in transaction`, etc.).   |
| `xact_start`  | Timestamp when the current transaction started.                                 |
| `query_start` | Timestamp when the current SQL query started.                                   |
| `query`       | The SQL statement currently being executed.                                     |

### Why Use It?

- Monitor currently running queries.
- Find long-running transactions.
- Detect queries causing performance issues.
- Identify sessions holding locks.

---

## 2. View Active Process IDs

```sql
SELECT pid, query
FROM pg_stat_activity
WHERE state = 'active';
```

### Purpose

Displays only the Process ID (`pid`) and the currently executing SQL query.

### Why Use It?

- Quickly identify the process you want to cancel or terminate.
- Useful before using `pg_cancel_backend()` or `pg_terminate_backend()`.

---

## 3. Terminate a Running Session

```sql
SELECT pg_terminate_backend(2665104);
```

### Purpose

Terminates the PostgreSQL backend process with the specified Process ID (`pid`).

### Why Use It?

- Stop a long-running query.
- Remove sessions blocking other transactions.
- Release locks held by a session.
- Force rollback of an uncommitted transaction.

> **Note:** Any uncommitted transaction belonging to that session is automatically rolled back.

---

## 4. View Idle Transactions

```sql
SELECT
    pid,
    usename,
    state,
    xact_start,
    query
FROM pg_stat_activity
WHERE state = 'idle in transaction';
```

### Purpose

Displays sessions that have started a transaction but are currently doing nothing without committing or rolling back.

### Why Use It?

- Detect forgotten transactions.
- Find sessions holding locks unnecessarily.
- Prevent database blocking.
- Improve overall database performance.

### Example

```sql
BEGIN;

UPDATE Employee
SET Salary = 50000
WHERE EmployeeId = 1;

-- User forgets to COMMIT or ROLLBACK
```

The session will appear as **idle in transaction**.

---

## 5. Terminate All Idle Transactions

```sql
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle in transaction';
```

### Purpose

Terminates all sessions that are currently in the **idle in transaction** state.

### Why Use It?

- Release locks held by abandoned transactions.
- Clean up unused database sessions.
- Resolve blocking issues.
- Improve database concurrency.

> **Warning:** This command terminates **all** idle transactions. Use it carefully in production environments.

---

# Common Session States

| State                 | Meaning                                                              |
| --------------------- | -------------------------------------------------------------------- |
| `active`              | The session is currently executing a SQL query.                      |
| `idle`                | The session is connected but not executing any query.                |
| `idle in transaction` | A transaction has started but has not been committed or rolled back. |
| `disabled`            | Statistics collection is disabled for the session.                   |

---

# Useful Workflow

### Step 1 — Find Running Queries

```sql
SELECT
    pid,
    usename,
    query,
    state
FROM pg_stat_activity
WHERE state = 'active';
```

↓

### Step 2 — Identify the Problematic Process

Copy the corresponding `pid`.

↓

### Step 3 — Terminate the Session

```sql
SELECT pg_terminate_backend(<pid>);
```

Example:

```sql
SELECT pg_terminate_backend(2665104);
```

---

# Summary

| Command                                                                        | Purpose                                                      |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `SELECT ... FROM pg_stat_activity WHERE state='active';`                       | View all active sessions and running queries.                |
| `SELECT pid, query FROM pg_stat_activity WHERE state='active';`                | Get the Process ID (`pid`) of active queries.                |
| `SELECT pg_terminate_backend(pid);`                                            | Forcefully terminate a session and rollback its transaction. |
| `SELECT ... WHERE state='idle in transaction';`                                | Find transactions that are open but inactive.                |
| `SELECT pg_terminate_backend(pid) FROM ... WHERE state='idle in transaction';` | Terminate all idle transactions.                             |
