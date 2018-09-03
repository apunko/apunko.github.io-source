import Firebase from './firebase';

class HupsService {
  constructor(userEmail) {
    this.hupsRef = Firebase.db().collection('users').doc(userEmail).collection('hups');
  }

  getAll() {
    return new Promise((resolve) => {
      this.hupsRef.get()
        .then((querySnapshot) => {
          const hups = [];
          querySnapshot.forEach((doc) => {
            hups.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          resolve(hups);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  create(hup) {
    return new Promise((resolve) => {
      this.hupsRef.add({ ...hup, drops: 0 })
        .then((docRef) => {
          resolve({ ...hup, id: docRef.id, drops: 0 });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  destroy(id) {
    return new Promise((resolve) => {
      this.hupsRef.doc(id).delete()
        .then(() => resolve())
        .catch((error) => {
          console.log(error);
        });
    });
  }

  update(id, attributes) {
    this.hupsRef.doc(id).update(attributes)
      .catch((error) => {
        console.log(error);
      });
  }
}

export default HupsService;
