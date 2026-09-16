PaymentId            BIGSERIAL PK
UserId               INTEGER NOT NULL FK
OrderId              VARCHAR(100) NOT NULL UNIQUE
Amount               NUMERIC(18,2) NOT NULL
Currency             VARCHAR(3) NOT NULL DEFAULT 'INR'
Status               VARCHAR(10) NOT NULL DEFAULT 'INITIATE'

TxnToken             VARCHAR(512)
TxnId                VARCHAR(100)
PaymentMode          VARCHAR(30)


ResponseCode         VARCHAR(10)
ResponseMessage      VARCHAR(255)

CallbackReceivedAt   TIMESTAMPTZ

CallbackData         JSONB

CreatedAt            TIMESTAMPTZ NOT NULL DEFAULT now()
UpdatedAt            TIMESTAMPTZ NOT NULL DEFAULT now()

GatewayName          VARCHAR(50)
BankName             VARCHAR(100)
TransactionDate      TIMESTAMPTZ