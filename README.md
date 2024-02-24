# Docflow frontend 

## Installation

To run locally on your machine, follow these steps:

1. Clone the repository to your local machine.

2. Install the required dependencies.

```bash
cd docFlow-frontend
npm install
```


3. Set up environment variables.

   - Create a `.env` file in the root directory.
   - Obtain your Google OAuth client id, backend origin base url `.env` file as follows-

```bash
MONGO_URL=your_mongo_atlas_url
VITE_BASE_URL=http://localhost:5000/api/v1
VITE_GOOGLE_CLIENTID=your_GoogleOAuth_clientid
```

4. Run the application.

```bash
npm start
```

## Technologies Used

- Vite + React + TypeScript
- React Query
- Quill
- Shadcn UI
- Tailwind CSS
- TypeScript
- Google OAuth

---