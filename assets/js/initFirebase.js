(function () {
  const config = {
    apiKey: 'AIzaSyBL66HpifAUoBxzr1O-pYTUUZpLBgOKBac',
    authDomain: 'sweetie-bird.firebaseapp.com',
    databaseURL: 'https://sweetie-bird.firebaseio.com',
    projectId: 'sweetie-bird',
    storageBucket: 'sweetie-bird.appspot.com',
    messagingSenderId: '927759104111',
  };

  if (window && window.firebase) {
    const fb = window.firebase;

    fb.initializeApp(config);

    fb.auth().setPersistence(fb.auth.Auth.Persistence.LOCAL);
  }
}());
