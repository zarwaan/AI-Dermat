## Tech Stack

### Front-end
- HTML  
- CSS  
- JavaScript  
- Bootstrap  

### Back-end

- **Disease Detection & Chatbot Implementation**
   - Language: Python
   - Server: `uvicorn`
   - Framework: `FastAPI`

- **Database Integration & Page Serving**
   - Language: Node.js
   - Framework: `Express.js`

### Database
   - MySQL

### Machine Learning
   - Programming Language: Python (Jupyter Notebook `.ipynb`)

### Libraries Used

- **Python**
   - `uvicorn`: Server creation and implementation  
   - `fastapi`: API implementation for disease detection and chatbot  
   - `google.generativeai`: Chatbot implementation  
   - `PyPDF2`: Viewing and reading PDF files  
   - `tensorflow`, `keras`: ML model training, testing, saving and fetching  
   - `matplotlib`: Performance metrics visualization  

- **Node.js**
   - `express`: Server creation and implementation  
   - `mysql2`: Database integration and manipulation  
   - `cookie-parser`: Server-side cookie manipulation  
   - `nodemailer`: Sending server-side emails  
   - `bcrypt`: Password hashing  

- **Common**
   - `dotenv`: `.env` file manipulation  

### Development Tools
- IDE: Visual Studio Code  
- Version Control: Git  
- Documentation Tools: Microsoft Word, Google Docs, Google Slides  
- Diagram Tools: Lucidchart  


## Installing and Running Locally

### Prerequisites

Make sure the following are installed on your system:

- [Python](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installation/)
- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/installer/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

Additional setup:

- Procure a [Gemini API Key](https://makersuite.google.com/app)
- Create an [App Password](https://support.google.com/accounts/answer/185833) for the email account that will be used to send appointment emails

### Steps to Set Up

1. **Clone the Repository**

   ```bash
   git clone https://github.com/zarwaan/AI-Dermat.git
   cd <project-directory>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   pip install -r requirements.txt
   ```

3. **Create a MySQL Connection Instance**

   Use MySQL Workbench or CLI to set up a new connection and database.     
   [Guide](https://dev.mysql.com/doc/mysql-getting-started/en/)

4. **Create a `.env` File**

   In the root directory, create a file named `.env` with the following contents:

   ```env
   DB_HOST=your_mysql_hostname
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name

   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_app_password

   GEMINI_API_KEY=your_gemini_api_key
   ```

5. **Initialize the Database**

   Run the following scripts to set up the database and tables:

   ```bash
   node database/createDb.js
   node database/dbConnection.js
   node database/createTables.js
   ```

6. **Start the Application**

   Start all the services:

   ```bash
   npm run start         # Runs on http://localhost:3000
   python src/gemini2.py # Runs on http://localhost:8001
   python src/main.py    # Runs on http://localhost:8000
   ```

7. **Open the App**

   Visit [http://localhost:3000](http://localhost:3000) in your browser to use the app.