<!-- Extend Our current type -->

type DBDetails = {
  baseConnection: BaseConnectionManagerV2;
  transaction: Transaction;
  schemaName: string;
};

type ExtendedDBDetails = DBDetails & {
  tenantId: number;
  userId: number;
};