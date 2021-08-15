We will call this attempt number 5 at creating a React and AWS Amplify application. 

I have previously gotten the Amplify Auth and database working in combination with a deployment to a live url. But the deployment failed when adding storage.

The most recent attempt allowed me to skip the deployment and run the entire amplify project locally. I had complete access to the authentication, database, and storage. But I did not document the complete steps.

So today I will try to recreate that process, but document it so I can repeat the process.


I will outline the steps following along with the AWS tutorial found here:
https://aws.amazon.com/getting-started/hands-on/build-react-app-amplify-graphql/

I am going to list my stemps numbered sequentially. I will try to make reference to what module it relates to and if there are any instructions in AWS I have skipped. 

There are some I don't have to make reference to because I already did that stuff, for example, installing the Amplify CLI tools. And I will not be deploying anything live. 



_______________________________________________________________________________________________________



1. Choose a directory where you will make your project and create a React app.
In this directory: 
C:\Users\Adam\ReactApps\aws\amplify\amplify2>npx create-react-app serverless

2. Open the AWS Management Console. If you do not have an AWS account, make one. Otherwise, login.
https://console.aws.amazon.com/

3. Open the AWS Amplify Console:
https://console.aws.amazon.com/amplify/home?region=us-east-1#/

4. Under 'Get Started', select the 'get started' button under Develop: Create an App Backend

5. Give the app a name: "serverless"

6. Click confirm deployment button

7. Configure the amplify CLI. Important note: you can do some things in the Visual Studio Code, terminal, other times you MUST use the Windows Command Prompt to run certain scripts.
So, open the Command Prompt and at the same path, run:
C:\Users\Adam\ReactApps\aws\amplify\amplify2>amplify configure
This step, I believe is useful if you want to create a separate IAM user for this project. Since I am using a root user account right now for testing, this is definitely something that should be done. I am making a note of it here for future reference, but for now, I am skipping it and for now, you can too. Again, in the future, note, this should not be managed by a root user, it should be whoever "owns" this project. An additional administrator or developer user.


Right now, your project in Visual Studio Code should look like this:

Amplify2
	|--serverless
		|--node modules
		|--public
		|--src
		|.gitignore
		|package-lock.json
		|package.json
		|README.md

It is critical for this next step that all of the aws related files be included in the serverless folder. Amplify 2 is the directory where the project is located. "serverless" is the root folder of the project.

8. In the AWS AmplifyConsole, in the "Backend Environments" tab, select the "Open admin UI" button.
You will see the staging environment. You want to pull this data into your project in Visual Studio Code. This will allow the web app to communicate with these AWS resources.

9. Go back to the previous screen and expand the Local setup instructions. Highlight the following:
amplify pull --appId d2c2oc9m7i36om --envName staging
Your appId may be different, that is okay.

10. In the Windows COmmand Prompt (terminal), at the following path, run:

C:\Users\Adam\ReactApps\aws\amplify\amplify2\serverless>amplify pull --appId d2c2oc9m7i36om --envName staging

11. A new tab may appear in your browser asking if you are sure you want to sign into Amplify. Click yes and you can close the tab.

12. Now, in the Command Prompt, you must select several options to complete the configuration of your AWS resources:
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
? What javascript framework are you using react
? Source Directory Path:  src 
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
? Do you plan on modifying this backend? Y

13. In Visual Studio Code, your project will now look like this:
Amplify2
	|--serverless
		|--.vscode
		|--amplify
		|--node_modules
		|--public
		|--src
			|aws-exports.js
		|.gitignore
		|package-lock.json
		|package.json
		|README.md

14. At the following path, run the following command:
C:\Users\Adam\ReactApps\aws\amplify\amplify2\serverless>npm install aws-amplify @aws-amplify/ui-react

15. Now at the same path, run the following command:
C:\Users\Adam\ReactApps\aws\amplify\amplify2\serverless>amplify add auth

You will have to select from three options, choose the following:
? Do you want to use the default authentication and security configuration? Default configuration
? How do you want users to be able to sign in? Username
? Do you want to configure advanced settings? No, I am done.

16. Now, push this configuration to the Amplify project:
C:\Users\Adam\ReactApps\aws\amplify\amplify2\serverless>amplify push --y

17. Now, in serverless>src>index.js, add the following Amplify configuration. The entire file should look like this:
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//amplify configuration
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

18. Now, in serverless>src>App.js, add the Amplify flow to the project. The entire project should be modified to look like this:

import React from 'react';
import './App.css';

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
      <h1>
        Amplify and React
      </h1>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);

19. Now run the app:
From within visual studio code, you can do this:
PS C:\Users\Adam\ReactApps\aws\amplify\amplify2\serverless> npm start

We had success, so far.

20. Try creating an account

Success! Qapla'! Erfolg! (original german)

21. Okay. Now we have to do the even harder stuff. Let's add the GraphQL API and database. Return to the WINDOWS Command Prompt and at the following path, run the following command:
C:\Users\Adam\ReactApps\aws\amplify\amplify2\serverless>amplify add api

You must select a number of options. Here are the choices you should make:
? Please select from one of the below mentioned services: GraphQL
? Provide API name: notesapp
? Choose the default authorization type for the API: API Key
? Enter a description for the API key: demo
? After how many days from now the API key should expire: 7 (or your preferred expiration)
? Do you want to configure advanced settings for the GraphQL API: No, I am done.
? Do you have an annotated GraphQL schema?  No
? Do you want a guided schema creation?  Yes
? What best describes your project: Single object with fields
? Do you want to edit the schema now? Yes

If successful, your program in Visual Studio will update and the scema.graphql file will open.

22. Modify that file FROM:
type Todo @model {
  id: ID!
  name: String!
  description: String
}

TO:
type Note @model {
  id: ID!
  name: String!
  description: String
}

and SAVE the file


23. Return to the Command Prompt and at the following path, execute the following command:
C:\Users\Adam\ReactApps\aws\amplify\amplify2\serverless>amplify push --y
 This will do 3 things:

    Create the AppSync API
    Create a DynamoDB table
    Create the local GraphQL operations in a folder located at src/graphql that you can use to query the API


24. And now we want to write code to interact with the Amplify resources in our React app. So, in serverless>src>App.js, write the following code:
import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>My Notes App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
      <button onClick={createNote}>Create Note</button>
      <div style={{marginBottom: 30}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <h2>{note.name}</h2>
              <p>{note.description}</p>
              <button onClick={() => deleteNote(note)}>Delete note</button>
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);


25. Now we want to create the storage service so we can upload and retrieve photographs:
As before, return to the Windows Command Prompt and execute the following command:
C:\Users\Adam\ReactApps\aws\amplify\amplify2\serverless>amplify add storage

You will be presented with a variety of options. These are the choices you should make:
? Please select from one of the below mentioned services: Content
? Please provide a friendly name for your resource that will be used to label this category in the project: imagestorage
? Please provide bucket name: <your-unique-bucket-name>
? Who should have access: Auth users only
? What kind of access do you want for Authenticated users? create, read, update, delete
? Do you want to add a Lambda Trigger for your S3 Bucket? N

26. Next, open amplify/backend/api/notesapp/schema.graphql and update it with the following schema:

type Note @model {
  id: ID!
  name: String!
  description: String
  image: String
}

SAVE the file

27. Now that the storage service has been configured locally and we've updated the GraphQL schema, we can deploy the updates by running the Amplify push command:

At the following path, execute the following command:
C:\Users\Adam\ReactApps\aws\amplify\amplify2\serverless>amplify push --y

28. Now, modify our App.js file:
import React, { useState, useEffect } from 'react';
import './App.css';
import { API, Storage  } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      if(note.image){
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }
  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  return (
    <div className="App">
      <h1>My Notes App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
      <input
        type="file"
        onChange={onChange}
      />
      <button onClick={createNote}>Create Note</button>
      <div style={{marginBottom: 30}}>
      {
         notes.map(note => (
          <div key={note.id || note.name}>
            <h2>{note.name}</h2>
            <p>{note.description}</p>
            <button onClick={() => deleteNote(note)}>Delete note</button>
            {
              note.image && <img src={note.image} style={{width: 400}} alt="" />
            }
          </div>
        ))
      }
      </div>
      <AmplifySignOut />
    </div>
  );
}


export default withAuthenticator(App);


29. Run the app locally:
npm start (Visual Studio Code terminal).

Success! We have it uploading the picture, title and description of the note. Alright, alright, alright.

Now start playing with the design and adding additional features....





POSTING REPOSITORY TO GIT

…or create a new repository on the command line

echo "# ReactAWS_Amplify" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/adamsawyer391/ReactAWS_Amplify.git
git push -u origin main

…or push an existing repository from the command line

git remote add origin https://github.com/adamsawyer391/ReactAWS_Amplify.git
git branch -M main
git push -u origin main





UPDATED VERSION OF HOW TO PUSH REPOSITORY TO GIHUB:


Tried every method and finally, it worked for me, I was unable to push in my repo because of this error, so please at least once try this!

_____________________________GENERATE THE PERSONAL ACCESS TOKEN :

    Click here and generate a personal access token , it's dam easy

https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token

NOW SIMPLY PUSH IT WITH THE HELP OF THE PAT RATHER THAN PASSWORD&USERNAME___________________

2 To push changes to your repo:

git push https://[Personal Access Token]@github.com/[User Name]/[Repository Name].git

I suffered a lot, so may it help you!

