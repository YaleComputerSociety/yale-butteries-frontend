# Yale Butteries (Frontend)

Yale Butteries is a React Native + Express.js app for ordering in advance from the Yale residential college butteries.

## Setting up the Development Environment

To run the full app, you will also need access to the [backend repository](https://github.com/Yale-Butteries/backend), but you can still do plenty without it

Install the latest version of **Node.js** and then **Yarn**. Additionally, download **XCode** if you're using a mac, and **Android Studio** otherwise (you can also use Android Studio on a Mac, but with the M1 chips it's a little tricky). 

There's a secret **.env** file that contains various private variables (passwords, urls, etc). In order to get access to this file, message the **yale-butteries** Slack channel. We'll send the contents of the file, and you should make a new file in the root of the `buttery-app` repository called EXACTLY `.env` where you should paste the contents. Be sure not to share this file with anyone with anyone outside the team. Also, **PLEASE MAKE SURE THE .env FILE IS GRAYED OUT, OTHERWISE EVERY PUSH WILL SEND THE FILE TO GITHUB WHERE ANYONE CAN ACCESS IT**

In the root of `buttery-app`, run ```yarn add``` to install all of the dependencies. Whenever someone adds a new package you'll need to run this command again (but it'll be shorter the next time)

Now run ```yarn start``` to run the app. 

##### XCode (Mac only)
Open **simulator** (it's a separate app that comes with Xcode). 

Expo should give you a couple of options on how to run the app. With simulator open, press i. The app should open on the phone

##### Android Studio
Open **Android Studio**, click on the three dots at the top right, and click on **virtual device manager**. If this is your first time, you'll need to set up a device. It doesn't matter much what the device is, just make one that works for your machine.

After pressing the play button to open an Android simulation, on **Expo** press a. THe app should open on the phone

*For Macs with M1 or above* You'll need to set up an emulator to run x86 chips, but this is beyond the scope of the readme


With the frontend running, you'll be able to see the app and interact with it, but any backend functionality won't work, which means, for example, that you won't be able to make payments or retrieve data from the database. Look at the [backend repository](https://github.com/TuckerMoses/yale-college-hub) to sort out the rest