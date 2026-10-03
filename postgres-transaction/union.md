UNION vs UNION ALL
SELECT "Name" FROM "Users1"
UNION
SELECT "FullName" FROM "Users2";

UNION duplicate rows hata deta hai.

SELECT "Name" FROM "Users1"
UNION ALL
SELECT "FullName" FROM "Users2";

UNION ALL duplicates ko bhi rakhta hai. PostgreSQL docs ke according UNION duplicate eliminate karta hai, jabki UNION ALL nahi.