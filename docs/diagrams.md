# System Diagrams - Online Pharmacy System

## 1. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER ||--o{ PRESCRIPTION : uploads
    USER ||--|| CART : has
    USER {
        ObjectId id PK
        string name
        string email UK
        string password
        string role
        object address
        string phone
        boolean isActive
        date createdAt
        date updatedAt
    }
    
    PRODUCT ||--o{ CART_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : contains
    PRODUCT {
        ObjectId id PK
        string name
        string description
        number price
        number stock
        string category
        string image
        boolean requiresPrescription
        string manufacturer
        date expiryDate
        boolean isActive
        date createdAt
        date updatedAt
    }
    
    CART ||--o{ CART_ITEM : contains
    CART {
        ObjectId id PK
        ObjectId userId FK
        date createdAt
        date updatedAt
    }
    
    CART_ITEM {
        ObjectId id PK
        ObjectId productId FK
        number quantity
    }
    
    ORDER ||--o{ ORDER_ITEM : contains
    ORDER {
        ObjectId id PK
        ObjectId userId FK
        number totalPrice
        string status
        string paymentMethod
        string paymentStatus
        object shippingAddress
        ObjectId prescriptionId FK
        date orderDate
        date deliveryDate
        date createdAt
        date updatedAt
    }
    
    ORDER_ITEM {
        ObjectId productId FK
        string name
        number quantity
        number price
    }
    
    PRESCRIPTION {
        ObjectId id PK
        ObjectId userId FK
        string filePath
        string fileType
        string status
        ObjectId reviewedBy FK
        date reviewDate
        string rejectionReason
        string notes
        date createdAt
        date updatedAt
    }
```

## 2. Use Case Diagram

```mermaid
graph TB
    Customer[Customer]
    Pharmacist[Pharmacist]
    Admin[Admin]
    System[Online Pharmacy System]
    
    Customer -->|Register/Login| System
    Customer -->|Browse Products| System
    Customer -->|Search Products| System
    Customer -->|Add to Cart| System
    Customer -->|Upload Prescription| System
    Customer -->|Place Order| System
    Customer -->|Track Order| System
    Customer -->|View Orders| System
    
    Pharmacist -->|Login| System
    Pharmacist -->|View Prescriptions| System
    Pharmacist -->|Approve Prescription| System
    Pharmacist -->|Reject Prescription| System
    Pharmacist -->|View Orders| System
    
    Admin -->|Login| System
    Admin -->|Manage Users| System
    Admin -->|Manage Products| System
    Admin -->|Manage Categories| System
    Admin -->|View All Orders| System
    Admin -->|View Statistics| System
    Admin -->|System Settings| System
```

## 3. Data Flow Diagram (DFD) - Level 0

```mermaid
graph LR
    Customer[Customer]
    Pharmacist[Pharmacist]
    Admin[Admin]
    System[Online Pharmacy System]
    Payment[Payment Gateway]
    Cloudinary[Cloudinary Storage]
    Email[Email Service]
    
    Customer -->|Browse/Search| System
    Customer -->|Upload Prescription| System
    Customer -->|Place Order| System
    System -->|Payment Request| Payment
    Payment -->|Payment Confirmation| System
    System -->|Store Files| Cloudinary
    System -->|Send Notifications| Email
    Pharmacist -->|Review Prescriptions| System
    Admin -->|Manage System| System
```

## 4. Sequence Diagram - Order Placement

```mermaid
sequenceDiagram
    participant C as Customer
    participant UI as Frontend
    participant API as Backend API
    participant DB as Database
    participant PG as Payment Gateway
    participant Email as Email Service
    
    C->>UI: Browse Products
    UI->>API: GET /api/products
    API->>DB: Query Products
    DB-->>API: Products List
    API-->>UI: Products Data
    UI-->>C: Display Products
    
    C->>UI: Add to Cart
    UI->>API: POST /api/cart
    API->>DB: Update Cart
    DB-->>API: Cart Updated
    API-->>UI: Cart Response
    UI-->>C: Cart Updated
    
    C->>UI: Proceed to Checkout
    UI->>API: POST /api/orders
    API->>DB: Validate Cart & Stock
    DB-->>API: Validation Result
    API->>PG: Process Payment
    PG-->>API: Payment Confirmation
    API->>DB: Create Order
    API->>DB: Update Stock
    API->>DB: Clear Cart
    DB-->>API: Order Created
    API->>Email: Send Order Confirmation
    API-->>UI: Order Created
    UI-->>C: Order Confirmation
```

## 5. Sequence Diagram - Prescription Review

```mermaid
sequenceDiagram
    participant C as Customer
    participant UI as Frontend
    participant API as Backend API
    participant DB as Database
    participant Cloudinary as Cloudinary
    participant P as Pharmacist
    participant Email as Email Service
    
    C->>UI: Upload Prescription
    UI->>API: POST /api/prescriptions (with file)
    API->>Cloudinary: Upload File
    Cloudinary-->>API: File URL
    API->>DB: Save Prescription (status: pending)
    DB-->>API: Prescription Saved
    API-->>UI: Upload Success
    UI-->>C: Confirmation
    
    P->>UI: View Pending Prescriptions
    UI->>API: GET /api/prescriptions/all?status=pending
    API->>DB: Query Prescriptions
    DB-->>API: Prescriptions List
    API-->>UI: Prescriptions Data
    UI-->>P: Display Prescriptions
    
    P->>UI: Review Prescription (Approve/Reject)
    UI->>API: PUT /api/prescriptions/:id/review
    API->>DB: Update Prescription Status
    DB-->>API: Prescription Updated
    API->>Email: Send Notification to Customer
    API-->>UI: Review Complete
    UI-->>P: Confirmation
```

## 6. Activity Diagram - Order Processing

```mermaid
flowchart TD
    Start([Customer Places Order]) --> ValidateCart{Validate Cart}
    ValidateCart -->|Empty| Error1[Show Error]
    ValidateCart -->|Valid| CheckStock{Check Stock}
    CheckStock -->|Insufficient| Error2[Show Stock Error]
    CheckStock -->|Available| ProcessPayment{Process Payment}
    ProcessPayment -->|Cash| CreateOrder[Create Order]
    ProcessPayment -->|Visa| PaymentGateway[Payment Gateway]
    PaymentGateway -->|Success| CreateOrder
    PaymentGateway -->|Failed| Error3[Payment Failed]
    CreateOrder --> UpdateStock[Update Product Stock]
    UpdateStock --> ClearCart[Clear Cart]
    ClearCart --> SendEmail[Send Confirmation Email]
    SendEmail --> End([Order Placed Successfully])
    Error1 --> End
    Error2 --> End
    Error3 --> End
```

## 7. Activity Diagram - Prescription Workflow

```mermaid
flowchart TD
    Start([Customer Uploads Prescription]) --> UploadFile[Upload File to Cloudinary]
    UploadFile --> SaveDB[Save Prescription to Database]
    SaveDB --> SetPending[Set Status: Pending]
    SetPending --> NotifyPharmacist[Notify Pharmacist]
    NotifyPharmacist --> WaitReview[Wait for Review]
    WaitReview --> PharmacistReviews{Pharmacist Reviews}
    PharmacistReviews -->|Approve| SetApproved[Set Status: Approved]
    PharmacistReviews -->|Reject| SetRejected[Set Status: Rejected]
    SetRejected --> AddReason[Add Rejection Reason]
    SetApproved --> NotifyCustomer1[Notify Customer - Approved]
    AddReason --> NotifyCustomer2[Notify Customer - Rejected]
    NotifyCustomer1 --> End1([Prescription Approved])
    NotifyCustomer2 --> End2([Prescription Rejected])
```

## 8. System Architecture Diagram

```mermaid
graph TB
    subgraph "Frontend Layer"
        React[React Application]
        Tailwind[TailwindCSS]
        Router[React Router]
    end
    
    subgraph "Backend Layer"
        Express[Express.js Server]
        Auth[JWT Authentication]
        Middleware[Middleware]
    end
    
    subgraph "Database Layer"
        MongoDB[(MongoDB)]
    end
    
    subgraph "External Services"
        Cloudinary[Cloudinary]
        Email[Email Service]
    end
    
    React --> Express
    Express --> Auth
    Express --> Middleware
    Express --> MongoDB
    Express --> Cloudinary
    Express --> Email
```





