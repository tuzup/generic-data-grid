# Generic Data Grid

## Getting Started

1. Clone the project repository.

### Setting Up the Server

3. Navigate to the `server` folder within the project directory.
4. Create a `.env` file inside the `server` folder and provide the port number and MongoDB URL. Refer to the example below:

    ```plaintext
    PORT=3001
    MONGODB_URI=mongodb://localhost:27017/generic_data_grid
    ```

5. Open a terminal and navigate to the `server` directory:

    ```bash
    npm install  # Install server-side dependencies
    npm start    # Start the server
    ```

### Setting Up the Client

6. Open a new terminal and navigate to the `client` directory within the project directory:

    ```bash
    npm install  # Install client-side dependencies
    npm start    # Start the client
    ```

7. Open [localhost:300](http://localhost:3000) to view 