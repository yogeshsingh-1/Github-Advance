type DbDetails = {
    connection: string,
    transaction: string,
    tenantId: number,
    active: true
}
// Make all properties in T optional
type Connection = Partial<DbDetails>;

// 
type DBQuery = Omit<DbDetails, "active">

type transaction = Pick<DbDetails, "transaction" | "tenantId" | "connection">

type capital = Capitalize<"hello">;

type temperature = "hot" | "cold";

let a: capital ;
let b: temperature;
b = "hot"
b = "cold"
// b = "soft"