# DoseMate

A simple personal medication tracker. Add a drug, mark each dose as taken, missed or snoozed, and see your adherence percentage.

## The problem

Many people stop taking a drug as soon as they feel better, for example after two days of malaria treatment. Nobody tracks it. DoseMate helps you see whether you are really finishing your course.

## Features

- [x] Add a medication (name, dosage, times per day, duration)
- [x] Save medications to Firebase and show them in a list
- [ ] Today's schedule with Taken / Missed / Snooze
- [ ] History and adherence percentage
- [ ] Browser reminders

## Tech stack

React, Vite, Tailwind CSS v3, Firebase (Cloud Firestore and Authentication)

## Getting started

1. Clone the repo and install packages:

```bash
git clone https://github.com/favoritewilliam0-ship-it/dosemate.git
cd dosemate
npm install
```

2. Create a Firebase project and add a `.env` file in the project root, next to `package.json`:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

3. Start the app:

```bash
npm run dev
```

## Data

The app uses Cloud Firestore. The adherence percentage is calculated in the app: doses taken divided by doses due so far.

## Team

- **Nusaibah**: Firebase, data functions, History page and adherence percentage, reminders
- **Favour**: project setup, main screens (Add Drug and Today's Schedule), deployment

## Status

In development, built for the Hello World DAMSA-DWIG Capstone.
