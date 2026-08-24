| Function/query | Meaning                                |
| -------------- | -------------------------------------- |
| `nextval()`    | Next ID generate karta hai             |
| `currval()`    | Current session mein last generated ID |
| `last_value`   | Sequence ki stored last value          |
| `setval()`     | Sequence ko manually set karta hai     |


# PostgreSQL Sequence Functions

PostgreSQL sequences are commonly used to generate unique numeric IDs for primary keys.

## 1. What is a Sequence?

A sequence is a PostgreSQL database object that generates numeric values, usually for IDs.

Example:

```sql
CREATE SEQUENCE "10081_108209"."GSTTaxCode_GSTTaxCodeId_seq";
```

Typical flow:

```text
INSERT
  ↓
nextval()
  ↓
Sequence generates ID
  ↓
GSTTaxCodeId
```

---

# 2. `nextval()`

## Purpose

`nextval()` generates and returns the next value from a sequence.

### Syntax

```sql
SELECT nextval('sequence_name'::regclass);
```

### Your sequence

```sql
SELECT nextval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass
);
```

If the sequence is currently at `100`, the result may be:

```text
101
```

### Important

Every `nextval()` call advances the sequence.

```text
nextval() → 101
nextval() → 102
nextval() → 103
```

Even if you don't insert a row afterward, the sequence value has been consumed. Therefore, sequence gaps are normal.

---

# 3. `currval()`

## Purpose

`currval()` returns the most recently obtained value from a sequence **in the current database session**.

### Syntax

```sql
SELECT currval('sequence_name'::regclass);
```

### Example

First call `nextval()`:

```sql
SELECT nextval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass
);
```

Suppose it returns:

```text
105
```

Now:

```sql
SELECT currval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass
);
```

returns:

```text
105
```

## Important limitation

`currval()` only works if `nextval()` has already been called for that sequence in the **same session/connection**.

Otherwise PostgreSQL can return an error similar to:

```text
currval of sequence ... is not yet defined in this session
```

---

# 4. `setval()`

## Purpose

`setval()` manually changes the sequence's current value.

### Basic syntax

```sql
SELECT setval(
    'sequence_name'::regclass,
    value
);
```

Example:

```sql
SELECT setval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass,
    500
);
```

Then:

```sql
SELECT nextval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass
);
```

will normally return:

```text
501
```

---

# 5. `setval()` with the third parameter

`setval()` has an important third parameter:

```sql
setval(sequence, value, is_called)
```

The third parameter is a boolean.

## `is_called = true`

```sql
SELECT setval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass,
    500,
    true
);
```

Meaning:

> Treat 500 as already returned/used.

Next:

```sql
SELECT nextval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass
);
```

Result:

```text
501
```

---

## `is_called = false`

```sql
SELECT setval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass,
    500,
    false
);
```

Meaning:

> The sequence is positioned at 500, but 500 has not yet been returned by `nextval()`.

Next:

```sql
SELECT nextval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass
);
```

Result:

```text
500
```

This difference is important when repairing or synchronizing sequences.

---

# 6. `lastval()`

## Purpose

`lastval()` returns the most recently obtained sequence value in the current session, regardless of which sequence generated it.

Example:

```sql
SELECT nextval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass
);
```

Suppose:

```text
200
```

Then:

```sql
SELECT lastval();
```

returns:

```text
200
```

### Difference between `currval()` and `lastval()`

`currval()`:

```sql
SELECT currval('some_sequence'::regclass);
```

Gets the last value for a **specific sequence**.

`lastval()`:

```sql
SELECT lastval();
```

Gets the most recently obtained sequence value in the **current session**.

---

# 7. Checking `last_value`

You can directly inspect the sequence:

```sql
SELECT last_value
FROM "10081_108209"."GSTTaxCode_GSTTaxCodeId_seq";
```

Example result:

```text
last_value
----------
205
```

This tells you the sequence's stored last value.

You can also check `is_called`:

```sql
SELECT
    last_value,
    is_called
FROM "10081_108209"."GSTTaxCode_GSTTaxCodeId_seq";
```

Example:

```text
last_value | is_called
-----------+----------
205        | true
```

---

# 8. `nextval()` vs `currval()` vs `lastval()` vs `setval()`

| Function | Purpose | Changes sequence? |
|---|---|---|
| `nextval()` | Generate next value | Yes |
| `currval()` | Get current session's value for a specific sequence | No |
| `lastval()` | Get last sequence value obtained in current session | No |
| `setval()` | Manually set sequence value | Yes |
| `last_value` | Inspect stored sequence value | No |

---

# 9. Primary Key Example

Suppose you have:

```sql
CREATE TABLE "10081_108209"."GSTTaxCode" (
    "GSTTaxCodeId" BIGSERIAL PRIMARY KEY,
    "Code" VARCHAR(20)
);
```

`BIGSERIAL` creates a sequence and uses `nextval()` as the default value for the primary key.

Conceptually:

```text
GSTTaxCode
    |
    └── GSTTaxCodeId
            |
            └── Sequence
                    |
                    └── nextval()
```

Now insert:

```sql
INSERT INTO "10081_108209"."GSTTaxCode" ("Code")
VALUES ('GST18');
```

PostgreSQL automatically obtains the ID from the sequence.

---

# 10. Get the Generated Primary Key

Instead of manually calling `currval()` after an insert, PostgreSQL provides a better approach:

```sql
INSERT INTO "10081_108209"."GSTTaxCode" ("Code")
VALUES ('GST18')
RETURNING "GSTTaxCodeId";
```

Result:

```text
GSTTaxCodeId
------------
206
```

This is generally the preferred approach when you want the ID generated by that particular `INSERT`.

---

# 11. Find the Sequence Used by a Column

You can ask PostgreSQL which sequence is associated with a column:

```sql
SELECT pg_get_serial_sequence(
    '"10081_108209"."GSTTaxCode"',
    'GSTTaxCodeId'
);
```

Example result:

```text
10081_108209.GSTTaxCode_GSTTaxCodeId_seq
```

This is useful because you don't have to hard-code the sequence name.

---

# 12. Synchronize Sequence After Manual Inserts

Suppose your table contains:

```text
GSTTaxCodeId
------------
1
2
3
4
500
```

but the sequence is still at:

```text
10
```

The next generated ID could collide with an existing ID.

A common way to synchronize it is:

```sql
SELECT setval(
    pg_get_serial_sequence(
        '"10081_108209"."GSTTaxCode"',
        'GSTTaxCodeId'
    ),
    (SELECT MAX("GSTTaxCodeId")
     FROM "10081_108209"."GSTTaxCode")
);
```

After this, the next `nextval()` will normally produce the value after the maximum existing ID.

---

# 13. Sequence Functions in One Example

```sql
-- Generate next value
SELECT nextval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass
);

-- Get current value for this specific sequence
SELECT currval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass
);

-- Get last sequence value obtained in this session
SELECT lastval();

-- Set sequence to 500 and consider 500 already called
SELECT setval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass,
    500,
    true
);

-- Set sequence to 500 but make 500 the next value
SELECT setval(
    '"10081_108209"."GSTTaxCode_GSTTaxCodeId_seq"'::regclass,
    500,
    false
);

-- Inspect stored sequence value
SELECT last_value
FROM "10081_108209"."GSTTaxCode_GSTTaxCodeId_seq";
```

---

# 14. Practical Rules

### When you need a new ID

Use:

```sql
nextval()
```

### When you need the current value from a sequence in the same session

Use:

```sql
currval()
```

### When you need the last sequence value obtained in the session

Use:

```sql
lastval()
```

### When you need to repair/reset a sequence

Use:

```sql
setval()
```

### When you only want to inspect the sequence

Use:

```sql
SELECT last_value, is_called
FROM "10081_108209"."GSTTaxCode_GSTTaxCodeId_seq";
```

### When you insert a row and need its generated ID

Prefer:

```sql
INSERT ...
RETURNING "GSTTaxCodeId";
```

rather than calling `currval()` separately.

---

# Quick Mental Model

```text
                 PostgreSQL SEQUENCE
                        |
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
      nextval()      currval()     setval()
          |             |             |
      Generate       Read last      Change
      next value     session value  sequence
          |
          ↓
       101 → 102 → 103 → 104

lastval()
   ↓
Last sequence value obtained in current session

last_value
   ↓
Stored value currently maintained by the sequence
```

The most important distinction to remember is:

```text
nextval()  → generates
currval()  → reads a specific sequence's session value
lastval()  → reads the last sequence value used by the session
setval()   → changes
last_value → inspects
```

