# Quick revision notes

Property Purpose
to Run migrations up to a specified migration
step Run a specified number of pending migrations
migrations Run explicitly selected migrations
rerun Control execution of already executed migrations
MergeExclusive Prevent mixing the three selection strategies

Master Umzug methods
In methods ko practically execute karke dekho.
Method Purpose
umzug.pending() Pending migrations check
umzug.executed() Executed migrations check
umzug.up() All pending migrations run
umzug.down() Last migration rollback
umzug.up({ step: 2 }) Next 2 migrations run
umzug.down({ step: 2 }) Last 2 migrations rollback
