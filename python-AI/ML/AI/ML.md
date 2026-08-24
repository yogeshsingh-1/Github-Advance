# AI/ML Engineering Roadmap

## NumPy → Pandas → ML → PyTorch → LLM → RAG → Agents

AI/ML Engineer banne ke liye ye concepts ek sequence mein seekhna useful hai. Har technology agle concept ki foundation banati hai.

---

# 1. NumPy

**NumPy = Numerical Python**

AI/ML mein bahut saara data numbers ke form mein hota hai. NumPy Python mein numerical data ke saath efficiently kaam karne ke liye use hota hai.

NumPy mainly:

- Arrays
- Vectors
- Matrices
- Mathematical operations
- Numerical calculations

ke liye use hota hai.

### Example

```python
import numpy as np

numbers = np.array([10, 20, 30, 40])

print(numbers.mean())
```

### NumPy mein kya seekhna hai?

- Array
- Shape
- Dimensions
- Indexing
- Slicing
- Vector
- Matrix
- Matrix multiplication
- Broadcasting
- Aggregation

### AI/ML mein NumPy ka role

```text
Numerical Data
      ↓
    NumPy
      ↓
Arrays / Vectors / Matrices
      ↓
Mathematical Operations
      ↓
ML / Deep Learning
```

**Goal:** Numerical data aur mathematical operations ke saath comfortable hona.

---

# 2. Pandas

**Pandas = Data Manipulation and Data Analysis Library**

Real-world data usually raw aur messy hota hai. Pandas ka use data ko read, clean, transform aur analyze karne ke liye hota hai.

### Example

```python
import pandas as pd

df = pd.read_csv("employees.csv")

print(df.head())
```

Yahan `df` ek **DataFrame** hai.

### Pandas mein kya seekhna hai?

- DataFrame
- Series
- CSV read/write
- Excel read/write
- Filtering
- Sorting
- `groupby()`
- `merge()`
- `join()`
- Missing values
- Duplicate values
- Data cleaning
- Data aggregation

### AI/ML mein Pandas ka role

```text
CSV / Excel / Database
          ↓
        Pandas
          ↓
      Data Cleaning
          ↓
   Data Transformation
          ↓
   Feature Engineering
          ↓
       ML Model
```

**Goal:** Raw data ko ML model ke liye useful format mein prepare karna.

---

# 3. Machine Learning (ML)

Ab actual **Machine Learning** start hoti hai.

### Machine Learning kya hai?

Machine Learning ka basic idea hai:

> Data se patterns learn karke prediction ya decision karna.

Example:

```text
House Size    House Price

500 sq ft  →  ₹20 Lakh
800 sq ft  →  ₹32 Lakh
1000 sq ft →  ₹40 Lakh
1500 sq ft →  ₹60 Lakh
```

Model in examples se relationship learn karta hai aur new house ki price predict kar sakta hai.

### Basic ML Flow

```text
Training Data
      ↓
ML Algorithm
      ↓
Trained Model
      ↓
New Data
      ↓
Prediction
```

## ML ke main types

### 1. Supervised Learning

Model ko input ke saath expected output bhi diya jata hai.

Examples:

- Linear Regression
- Logistic Regression
- Decision Tree
- Random Forest
- KNN
- SVM

### 2. Unsupervised Learning

Model ko predefined output nahi diya jata. Model data ke andar patterns find karta hai.

Examples:

- K-Means
- DBSCAN
- Hierarchical Clustering
- PCA

### ML mein important concepts

- Features
- Labels
- Training Data
- Validation Data
- Test Data
- Overfitting
- Underfitting
- Bias
- Variance
- Cross Validation
- Hyperparameter Tuning

### Model Evaluation

#### Classification

- Accuracy
- Precision
- Recall
- F1 Score
- Confusion Matrix
- ROC-AUC

#### Regression

- MAE
- MSE
- RMSE
- R²

**Goal:** Data se model train karna aur us model ki prediction quality ko evaluate karna.

---

# 4. PyTorch

Ab **Deep Learning** ki taraf move karte hain.

**PyTorch ek Deep Learning Framework hai.**

PyTorch ka use neural networks ko build, train aur deploy karne ke liye hota hai.

### Basic Neural Network Flow

```text
Input
  ↓
Neural Network
  ↓
Prediction
  ↓
Loss
  ↓
Backpropagation
  ↓
Weights Update
  ↓
Repeat
```

### PyTorch mein kya seekhna hai?

- Tensor
- Dataset
- DataLoader
- Neural Network
- Layers
- Activation Functions
- Loss Functions
- Optimizers
- Forward Propagation
- Backpropagation
- Training Loop
- GPU

### PyTorch ke baad

```text
Neural Networks
      ↓
CNN
      ↓
RNN / LSTM Basics
      ↓
Attention
      ↓
Transformers
```

**Goal:** Neural networks ko build aur train karna aur Deep Learning ke fundamentals ko samajhna.

---

# 5. LLM

**LLM = Large Language Model**

LLM ka use human language ko understand aur generate karne ke liye hota hai.

Examples:

- GPT
- Claude
- Gemini
- Llama

LLM text ko tokens mein process karta hai aur context ke according output generate karta hai.

### Basic LLM Flow

```text
Text
 ↓
Tokenization
 ↓
Tokens
 ↓
Embeddings
 ↓
Transformer
 ↓
Attention
 ↓
Output
```

### LLM mein kya seekhna hai?

- Token
- Tokenization
- Embeddings
- Context Window
- Attention
- Self-Attention
- Transformer Architecture
- Temperature
- Top-p
- Prompting
- Structured Output
- Function Calling
- Fine-Tuning Basics

### Important

LLM ko **use karna** aur LLM ko **train karna** alag cheezein hain.

AI Engineer ke liye initially:

```text
LLM API
   ↓
Prompt
   ↓
Structured Output
   ↓
Function / Tool Calling
```

seekhna important hai.

**Goal:** LLM ka basic working samajhna aur AI applications mein LLMs ko effectively use karna.

---

# 6. RAG

**RAG = Retrieval-Augmented Generation**

RAG ka use LLM ko external ya private data ke saath kaam karwane ke liye hota hai.

### Problem

Maan lo company ke paas:

```text
10,000 PDFs
1,000 Documents
Company Database
Internal Knowledge
```

LLM ko ye private information automatically pata nahi hoti.

RAG relevant information ko retrieve karke LLM ko provide karta hai.

### RAG Flow

```text
Documents
    ↓
Text Extraction
    ↓
Chunking
    ↓
Embeddings
    ↓
Vector Database
    ↓
Similarity Search
    ↓
Relevant Context
    ↓
LLM
    ↓
Answer
```

### User Question Flow

```text
User Question
      ↓
Question Embedding
      ↓
Vector Search
      ↓
Relevant Documents
      ↓
Context
      ↓
LLM
      ↓
Answer
```

### RAG mein kya seekhna hai?

- Document Loading
- Text Chunking
- Embeddings
- Vector Database
- Similarity Search
- Metadata Filtering
- Hybrid Search
- Reranking
- Retrieval Evaluation

### Vector Databases

Examples:

- PostgreSQL + pgvector
- Qdrant
- Pinecone
- Weaviate

Agar PostgreSQL already aata hai, to **PostgreSQL + pgvector** se start karna useful hai.

**Goal:** LLM ko private ya external knowledge ke saath accurately kaam karwana.

---

# 7. AI Agents

Sabse last mein **AI Agents**.

Normal LLM application mein flow simple hota hai:

```text
User
 ↓
LLM
 ↓
Answer
```

Lekin Agent multiple steps perform kar sakta hai aur external tools use kar sakta hai.

### AI Agent Flow

```text
User
 ↓
Agent / LLM
 ↓
Decide What To Do
 ↓
Tool
 ↓
Tool Result
 ↓
LLM
 ↓
Next Action
 ↓
Final Answer
```

### Example

User:

```text
"Last month ki top 10 selling products batao."
```

Agent:

```text
User Question
      ↓
      LLM
      ↓
Need Database?
      ↓
SQL Tool
      ↓
PostgreSQL
      ↓
Query Result
      ↓
LLM
      ↓
Human-readable Answer
```

### Agent ke tools

Agent different tools use kar sakta hai:

- Database
- Web Search
- Calculator
- File Search
- Email
- External APIs
- Code Execution

### Agents mein kya seekhna hai?

- Tool Calling
- Function Calling
- Agent Loop
- Memory
- Planning
- Multi-step Tasks
- Workflows
- MCP
- Agent Evaluation

**Goal:** LLM ko tools ke saath multi-step tasks perform karwana.

---

# Complete AI/ML Learning Flow

```text
                    AI / ML ENGINEER
                           │
                           ▼
                         NumPy
                           │
                           ▼
                         Pandas
                           │
                           ▼
                    Machine Learning
                           │
                           ▼
                        PyTorch
                           │
                           ▼
                      Transformers
                           │
                           ▼
                          LLM
                           │
                           ▼
                          RAG
                           │
                           ▼
                        Agents
```

---

# Practical AI Application Architecture

```text
                    User
                      ↓
                  React / UI
                      ↓
                   FastAPI
                      ↓
               AI Application
                      ↓
            ┌─────────┴─────────┐
            ↓                   ↓
           RAG                Agent
            ↓                   ↓
      Vector Database       Tools
            ↓                   ↓
         Context          PostgreSQL / APIs
            ↓                   ↓
            └─────────┬─────────┘
                      ↓
                     LLM
                      ↓
                   Response
```

---

# Recommended Learning Order

```text
1. Python
      ↓
2. NumPy
      ↓
3. Pandas
      ↓
4. Machine Learning
      ↓
5. PyTorch
      ↓
6. Transformers
      ↓
7. LLM
      ↓
8. RAG
      ↓
9. AI Agents
      ↓
10. FastAPI
      ↓
11. Docker
      ↓
12. Production AI
```

---

# Final Goal

AI/ML Engineer ke liye sirf models banana enough nahi hai.

Tumhe eventually ye complete system build karna aana chahiye:

```text
Data
 ↓
Preprocessing
 ↓
ML / Deep Learning
 ↓
LLM
 ↓
RAG / Agents
 ↓
FastAPI
 ↓
PostgreSQL / Vector DB
 ↓
Redis
 ↓
Docker
 ↓
Cloud Deployment
 ↓
Monitoring
```

## Main Objective

> **AI model ko samajhna + AI application banana + us application ko production mein deploy karna.**

