
-- 1st query (Isme aliasing first wale ki wajah se aayegi )

SELECT x."UserName"
FROM (
    SELECT u1."Name" AS "UserName"
    FROM "Users1" u1

    UNION

    SELECT u2."FullName"
    FROM "Users2" u2
) x;

-- 2nd query
--  UNION → dono tables ke records combine karta hai
-- ORDER BY ... DESC → combined records ko date ke according sort karta hai
-- LIMIT 1 → sorted result ki first row leta hai
SELECT
    x."Name",
    x."Email",
    x."RenewalDate"
FROM (
    SELECT
        u1."Name",
        u1."Email",
        u1."CreatedAt" AS "RenewalDate"
    FROM "Users1" u1
    WHERE u1."Id" = 1

    UNION

    SELECT
        u2."FullName",
        u2."FullEmail",
        u2."CreatedAt"
    FROM "Users2" u2
    WHERE u2."Id" = 3
) x
ORDER BY x."RenewalDate" DESC
LIMIT 1;

