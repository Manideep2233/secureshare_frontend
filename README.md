**Frontend Repository Title: SecureShare-Frontend**

**Description:**
The SecureShare-Frontend repository contains the frontend implementation of the Share Securely Services (S3) project, a web service designed to allow multiple authenticated users to securely share various types of items, including pictures, videos, text, and binary files. This project is developed using Angular 8, providing a responsive and user-friendly interface for interacting with the backend services.

**Key Features:**
- **User Authentication and Authorization:** Integrates with the backend Spring Security for secure user authentication and authorization. Supports two types of users: general users and administrators.
- **Item Management:** Provides a user-friendly interface for users to perform CRUD operations on items, including viewing, putting, getting, and removing items. Supports various item types such as pictures, videos, text, and binary files.
- **Group Management:** Enables users to join existing groups or create new ones directly from the frontend interface. Group membership requires acceptance by administrators.
- **Operations on Items:** Allows users to easily interact with items, including retrieving, deleting, and viewing items. Displays all items in groups the user is a member of.
- **Responsive Design:** Utilizes Angular 8's features for building responsive web applications, ensuring optimal user experience across different devices and screen sizes.
- **User-friendly Interface:** Implements intuitive user interface components and navigation to enhance usability and accessibility for users.

**Implementation Details:**
- **Framework:** Angular 8
- **UI Components:** Utilizes Angular Material for UI components and styling to maintain a consistent and modern look and feel.
- **Authentication:** Integrates with the backend Spring Security for secure user authentication and authorization.
- **HTTP Requests:** Communicates with the backend RESTful API using Angular's HttpClient module to fetch and send data.
- **Routing:** Implements Angular Router for navigation between different components and pages within the application.
- **Forms:** Utilizes Angular Reactive Forms for building and validating user input forms.
- **Services:** Uses Angular services to encapsulate business logic and interact with backend APIs.
- **Responsive Design:** Implements responsive design principles using Angular Flex Layout to ensure the application adapts to different screen sizes.

**Installation and Setup:**
1. Clone the repository to your local machine.
2. Ensure that Node.js and npm are installed.
3. Navigate to the project directory and run `npm install` to install dependencies.
4. Configure the backend API endpoint in the environment configuration files (`environment.ts` and `environment.prod.ts`).
5. Run the application using `ng serve` command.


**Changes to make in Code for running it:**
https://www.mongodb.com/products/platform/cloud

go to the above url and signup and host your MongoDB and update it in spring application, in application.properties
```
spring.data.mongodb.uri=mongodb+srv://root:root@cluster0.crkygpz.mongodb.net/test
```
 or you can set-up mongodb locally and set-up the properties.

 For back-end code:
 
 refer ( Developed using Java 15, Spring Boot, MongoDB): 
 ```
https://github.com/Manideep2233/SecureShare_backend
 ```
