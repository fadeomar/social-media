const { db } = require("../utils/admin");

exports.getAllScreams = (req, res) => {
  db.collection("screams")
    .orderBy("createAt", "desc")
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createAt: doc.data().createAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage
        });
      });
      return res.json(screams);
    })
    .catch(e => console.error(e));
};

exports.addScream = (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "body must not empty" });
  }
  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0
  };

  db.collection("screams")
    .add(newScream)
    .then(doc => {
      const resScream = newScream;
      resScream.screamId = doc.id;
      res.json(resScream);
    })
    .catch(e => {
      res.status("500").json({ error: "somthing wrong" });
      console.log(e);
    });
};

exports.getScream = (req, res) => {
  let = {};
  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found0" });
      }
      screamData = doc.data();
      screamData.screamId = doc.id;
      return db
        .collection("comments")
        .orderBy("createAt", "desc")
        .where("screamId", "==", req.params.screamId)
        .get();
    })
    .then(data => {
      screamData.comments = [];
      data.forEach(doc => {
        screamData.comments.push(doc.data());
      });
      return res.json(screamData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.commentOnScream = (req, res) => {
  if (!req.body.body.trim())
    return res.status(400).json({ comment: "Must not be epmty" });

  const newComment = {
    body: req.body.body,
    createAt: new Date().toISOString(),
    screamId: req.params.screamId,
    userImage: req.user.imageUrl,
    userHandle: req.user.handle
  };

  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then(doc => {
      if (!doc.exists)
        return res.status(404).json({ error: "scream not found" });
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.likeScream = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);

  let screamData = {};

  screamDocument
    .get()
    .then(doc => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "scream not found " });
      }
    })
    .then(data => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            screamId: req.params.screamId,
            userHandle: req.user.handle
          })
          .then(() => {
            screamData.likeCount++;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.json(screamData);
          });
      } else {
        return res.status(400).json({ error: "scream already liked" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err.code });
    });
};

exports.unlikeScream = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);

  let screamData = {};

  screamDocument
    .get()
    .then(doc => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "scream not found " });
      }
    })
    .then(data => {
      if (data.empty) {
        return res.status(400).json({ error: "scream not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            screamData.likeCount--;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            res.json(screamData);
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err.code });
    });
};

// delete scream

exports.deleteScream = (req, res) => {
  const document = db.doc(`/screams/${req.params.screamId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream Not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "unauthoraized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "scream deleted successfully ." });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
