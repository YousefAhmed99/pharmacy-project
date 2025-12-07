# Test Cases - Online Pharmacy System

## 1. Authentication Tests

### TC-AUTH-001: User Registration
- **Preconditions**: User is not logged in
- **Test Steps**:
  1. Navigate to /register
  2. Fill in all required fields (name, email, password, confirm password)
  3. Click Register button
- **Expected Result**: User is registered and redirected to home page
- **Status**: ⬜ Not Tested

### TC-AUTH-002: User Registration - Duplicate Email
- **Preconditions**: User with email already exists
- **Test Steps**:
  1. Navigate to /register
  2. Enter existing email
  3. Fill other fields
  4. Click Register
- **Expected Result**: Error message "User already exists"
- **Status**: ⬜ Not Tested

### TC-AUTH-003: User Login
- **Preconditions**: Valid user account exists
- **Test Steps**:
  1. Navigate to /login
  2. Enter valid email and password
  3. Click Login
- **Expected Result**: User is logged in and redirected
- **Status**: ⬜ Not Tested

### TC-AUTH-004: User Login - Invalid Credentials
- **Preconditions**: User account exists
- **Test Steps**:
  1. Navigate to /login
  2. Enter invalid email or password
  3. Click Login
- **Expected Result**: Error message "Invalid credentials"
- **Status**: ⬜ Not Tested

### TC-AUTH-005: User Logout
- **Preconditions**: User is logged in
- **Test Steps**:
  1. Click Logout button
- **Expected Result**: User is logged out and redirected to home
- **Status**: ⬜ Not Tested

## 2. Product Management Tests

### TC-PROD-001: Browse Products
- **Preconditions**: User is on home page
- **Test Steps**:
  1. Click on "Products" in navigation
  2. View product list
- **Expected Result**: Products are displayed in grid layout
- **Status**: ⬜ Not Tested

### TC-PROD-002: Search Products
- **Preconditions**: User is on products page
- **Test Steps**:
  1. Enter search term in search box
  2. View results
- **Expected Result**: Products matching search term are displayed
- **Status**: ⬜ Not Tested

### TC-PROD-003: Filter by Category
- **Preconditions**: User is on products page
- **Test Steps**:
  1. Select category from dropdown
  2. View filtered results
- **Expected Result**: Only products from selected category are shown
- **Status**: ⬜ Not Tested

### TC-PROD-004: Filter by Prescription Requirement
- **Preconditions**: User is on products page
- **Test Steps**:
  1. Select "Prescription Required" filter
  2. View results
- **Expected Result**: Only products requiring prescription are shown
- **Status**: ⬜ Not Tested

### TC-PROD-005: View Product Details
- **Preconditions**: User is on products page
- **Test Steps**:
  1. Click on a product
  2. View product details page
- **Expected Result**: Product details are displayed correctly
- **Status**: ⬜ Not Tested

### TC-PROD-006: Add Product to Cart
- **Preconditions**: User is logged in, viewing product
- **Test Steps**:
  1. Click "Add to Cart" button
  2. Check cart
- **Expected Result**: Product is added to cart, success message shown
- **Status**: ⬜ Not Tested

### TC-PROD-007: Add Out of Stock Product
- **Preconditions**: Product has stock = 0
- **Test Steps**:
  1. Try to add product to cart
- **Expected Result**: Button disabled, "Out of Stock" message
- **Status**: ⬜ Not Tested

## 3. Cart Management Tests

### TC-CART-001: View Cart
- **Preconditions**: User is logged in, has items in cart
- **Test Steps**:
  1. Navigate to /cart
  2. View cart items
- **Expected Result**: All cart items are displayed with correct quantities and prices
- **Status**: ⬜ Not Tested

### TC-CART-002: Update Item Quantity
- **Preconditions**: User has items in cart
- **Test Steps**:
  1. Navigate to /cart
  2. Increase quantity of an item
  3. Check total
- **Expected Result**: Quantity updated, total recalculated
- **Status**: ⬜ Not Tested

### TC-CART-003: Remove Item from Cart
- **Preconditions**: User has items in cart
- **Test Steps**:
  1. Navigate to /cart
  2. Click remove button on an item
- **Expected Result**: Item removed from cart, total updated
- **Status**: ⬜ Not Tested

### TC-CART-004: Clear Cart
- **Preconditions**: User has items in cart
- **Test Steps**:
  1. Clear all items
- **Expected Result**: Cart is empty
- **Status**: ⬜ Not Tested

### TC-CART-005: Empty Cart Checkout
- **Preconditions**: Cart is empty
- **Test Steps**:
  1. Try to proceed to checkout
- **Expected Result**: Error message, checkout disabled
- **Status**: ⬜ Not Tested

## 4. Order Management Tests

### TC-ORD-001: Place Order - Cash
- **Preconditions**: User has items in cart, is logged in
- **Test Steps**:
  1. Navigate to /cart
  2. Click "Proceed to Checkout"
  3. Select "Cash" payment method
  4. Complete order
- **Expected Result**: Order created, cart cleared, confirmation shown
- **Status**: ⬜ Not Tested

### TC-ORD-002: Place Order - Visa
- **Preconditions**: User has items in cart, is logged in
- **Test Steps**:
  1. Navigate to /cart
  2. Click "Proceed to Checkout"
  3. Select "Visa" payment method
  4. Complete payment
  5. Complete order
- **Expected Result**: Order created with payment confirmation
- **Status**: ⬜ Not Tested

### TC-ORD-003: View Order History
- **Preconditions**: User has placed orders
- **Test Steps**:
  1. Navigate to /orders
  2. View order list
- **Expected Result**: All user orders are displayed with status
- **Status**: ⬜ Not Tested

### TC-ORD-004: View Order Details
- **Preconditions**: User has orders
- **Test Steps**:
  1. Navigate to /orders
  2. Click on an order
- **Expected Result**: Order details are displayed
- **Status**: ⬜ Not Tested

### TC-ORD-005: Order with Insufficient Stock
- **Preconditions**: Product stock is less than cart quantity
- **Test Steps**:
  1. Try to place order
- **Expected Result**: Error message, order not created
- **Status**: ⬜ Not Tested

## 5. Prescription Management Tests

### TC-PRES-001: Upload Prescription - Image
- **Preconditions**: User is logged in
- **Test Steps**:
  1. Navigate to /prescriptions
  2. Select image file
  3. Click Upload
- **Expected Result**: Prescription uploaded, status "pending"
- **Status**: ⬜ Not Tested

### TC-PRES-002: Upload Prescription - PDF
- **Preconditions**: User is logged in
- **Test Steps**:
  1. Navigate to /prescriptions
  2. Select PDF file
  3. Click Upload
- **Expected Result**: Prescription uploaded, status "pending"
- **Status**: ⬜ Not Tested

### TC-PRES-003: Upload Invalid File Type
- **Preconditions**: User is logged in
- **Test Steps**:
  1. Try to upload non-image/PDF file
- **Expected Result**: Error message, upload rejected
- **Status**: ⬜ Not Tested

### TC-PRES-004: View Prescriptions (Customer)
- **Preconditions**: Customer has uploaded prescriptions
- **Test Steps**:
  1. Navigate to /prescriptions
  2. View prescription list
- **Expected Result**: All user prescriptions are displayed
- **Status**: ⬜ Not Tested

### TC-PRES-005: Approve Prescription (Pharmacist)
- **Preconditions**: Pharmacist is logged in, pending prescription exists
- **Test Steps**:
  1. Navigate to /prescriptions
  2. Click "Approve" on a prescription
- **Expected Result**: Prescription status changed to "approved", customer notified
- **Status**: ⬜ Not Tested

### TC-PRES-006: Reject Prescription (Pharmacist)
- **Preconditions**: Pharmacist is logged in, pending prescription exists
- **Test Steps**:
  1. Navigate to /prescriptions
  2. Click "Reject" on a prescription
  3. Enter rejection reason
- **Expected Result**: Prescription status changed to "rejected", reason saved, customer notified
- **Status**: ⬜ Not Tested

## 6. Admin Tests

### TC-ADMIN-001: View Dashboard
- **Preconditions**: Admin is logged in
- **Test Steps**:
  1. Navigate to /dashboard
- **Expected Result**: Dashboard displays statistics (users, products, orders, prescriptions)
- **Status**: ⬜ Not Tested

### TC-ADMIN-002: Create Product
- **Preconditions**: Admin is logged in
- **Test Steps**:
  1. Navigate to products management
  2. Fill product form
  3. Submit
- **Expected Result**: Product created successfully
- **Status**: ⬜ Not Tested

### TC-ADMIN-003: Update Product
- **Preconditions**: Admin is logged in, product exists
- **Test Steps**:
  1. Edit product details
  2. Save changes
- **Expected Result**: Product updated successfully
- **Status**: ⬜ Not Tested

### TC-ADMIN-004: Delete Product
- **Preconditions**: Admin is logged in, product exists
- **Test Steps**:
  1. Delete a product
- **Expected Result**: Product deleted, confirmation shown
- **Status**: ⬜ Not Tested

### TC-ADMIN-005: View All Users
- **Preconditions**: Admin is logged in
- **Test Steps**:
  1. Navigate to users management
- **Expected Result**: List of all users displayed
- **Status**: ⬜ Not Tested

### TC-ADMIN-006: Update User
- **Preconditions**: Admin is logged in, user exists
- **Test Steps**:
  1. Edit user details
  2. Save changes
- **Expected Result**: User updated successfully
- **Status**: ⬜ Not Tested

### TC-ADMIN-007: View All Orders
- **Preconditions**: Admin is logged in
- **Test Steps**:
  1. Navigate to orders management
- **Expected Result**: All orders from all users displayed
- **Status**: ⬜ Not Tested

### TC-ADMIN-008: Update Order Status
- **Preconditions**: Admin is logged in, order exists
- **Test Steps**:
  1. Change order status
  2. Save
- **Expected Result**: Order status updated
- **Status**: ⬜ Not Tested

## 7. Security Tests

### TC-SEC-001: Access Protected Route Without Auth
- **Preconditions**: User is not logged in
- **Test Steps**:
  1. Try to access /cart or /orders
- **Expected Result**: Redirected to /login
- **Status**: ⬜ Not Tested

### TC-SEC-002: Access Admin Route as Customer
- **Preconditions**: Customer is logged in
- **Test Steps**:
  1. Try to access admin routes
- **Expected Result**: Access denied, redirected
- **Status**: ⬜ Not Tested

### TC-SEC-003: JWT Token Expiry
- **Preconditions**: User has expired token
- **Test Steps**:
  1. Try to make API request with expired token
- **Expected Result**: 401 error, redirected to login
- **Status**: ⬜ Not Tested

## 8. UI/UX Tests

### TC-UI-001: Responsive Design - Mobile
- **Preconditions**: None
- **Test Steps**:
  1. View application on mobile device
- **Expected Result**: Layout adapts to mobile screen
- **Status**: ⬜ Not Tested

### TC-UI-002: Responsive Design - Tablet
- **Preconditions**: None
- **Test Steps**:
  1. View application on tablet
- **Expected Result**: Layout adapts to tablet screen
- **Status**: ⬜ Not Tested

### TC-UI-003: Loading States
- **Preconditions**: None
- **Test Steps**:
  1. Perform actions that trigger loading
- **Expected Result**: Loading indicators shown
- **Status**: ⬜ Not Tested

### TC-UI-004: Error Messages
- **Preconditions**: None
- **Test Steps**:
  1. Trigger error conditions
- **Expected Result**: User-friendly error messages displayed
- **Status**: ⬜ Not Tested

### TC-UI-005: Success Notifications
- **Preconditions**: None
- **Test Steps**:
  1. Perform successful actions
- **Expected Result**: Success notifications shown
- **Status**: ⬜ Not Tested





