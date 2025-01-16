# 🚀 Daily JavaScript App - 18: Email Subscription Form with Google Sheets Integration

This repository is part of my **Daily JavaScript Coding Challenge** to build one JavaScript project every day. 🌟 The goal is to refine my JavaScript skills 🧠 while fostering consistency in coding. 💻✨

This project is a **simple email subscription form** that integrates with **Google Sheets**. It uses **Google Apps Script** to securely and efficiently manage data transfer, making it ideal for small-scale email collection needs.

---

## 🚀 Features

- Collects email addresses via a web form.
- Stores subscriber data directly into a Google Sheet.
- Displays success or error messages upon form submission.
- Includes basic client-side email validation.
- Easy to deploy and customize.

---

## 🛠️ Technologies Used

- **HTML5**: Structuring the form and layout.
- **CSS3**: Styling the form and webpage.
- **JavaScript**: Handling form submission and interaction.
- **Google Apps Script**: Backend integration with Google Sheets.

---

## ⚙️ How It Works

1. Users enter their email address in the input field.
2. On submission, the form sends the email to a Google Apps Script URL using the Fetch API.
3. The Google Apps Script processes the data and appends it to the specified Google Sheet.
4. A confirmation message is displayed, and the form resets.

---

## 📝 Setup Instructions

Follow these steps to set up and run the project:

### 1. Clone the Repository
```bash
git clone https://github.com/enesatacan/Email-Subscription-
cd Email-Subscription-
```

### 2. Configure Google Sheets
1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Rename the first sheet to `Sheet1` (or your language equivalent, e.g., `Sayfa1` for Turkish).
3. Add the following headers to the first row:
   ```
   timestamp | email
   ```

### 3. Deploy Google Apps Script
1. Go to **Tools > Script Editor** in your Google Sheet.
2. Copy and paste the following script:
   ```javascript
   var sheetName = 'Sheet1'; // Replace with your sheet name if different
   var scriptProp = PropertiesService.getScriptProperties();

   function intialSetup() {
     var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
     scriptProp.setProperty('key', activeSpreadsheet.getId());
   }

   function doPost(e) {
     var lock = LockService.getScriptLock();
     lock.tryLock(10000);

     try {
       var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
       var sheet = doc.getSheetByName(sheetName);

       var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
       var nextRow = sheet.getLastRow() + 1;

       var newRow = headers.map(function (header) {
         return header === 'timestamp' ? new Date() : e.parameter[header];
       });

       sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

       return ContentService
         .createTextOutput(JSON.stringify({ result: 'success', row: nextRow }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (e) {
       return ContentService
         .createTextOutput(JSON.stringify({ result: 'error', error: e }))
         .setMimeType(ContentService.MimeType.JSON);
     } finally {
       lock.releaseLock();
     }
   }
   ```
3. Save the script and run the `intialSetup` function to link your script with the Google Sheet.
4. Deploy the script as a web app:
   - Go to **Publish > Deploy as Web App**.
   - Set **Execute the app as** to `Me`.
   - Set **Who has access** to `Anyone, even anonymous`.
   - Copy the **web app URL**.

### 4. Update the HTML File
1. Open `index.html`.
2. Replace the `<SCRIPT URL>` placeholder with your web app URL:
   ```javascript
   const scriptURL = "YOUR_WEB_APP_URL";
   ```

### 5. Run the Application
1. Host the files locally or deploy them using services like GitHub Pages, Netlify, or Vercel.
2. Open the application in your browser.
3. Test the form by submitting an email address.

---

## 📷 Screenshots

![image](https://github.com/user-attachments/assets/dcbbeaf3-df6b-45e2-8867-e0ed83b861e2)


![image](https://github.com/user-attachments/assets/a33685dc-5a17-4082-8cc3-cca316237460)

